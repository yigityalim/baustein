'use client'; // Client Component olmak zorunda

import { LogIn, User, Smartphone, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client"; // Client SDK
import { signInAnonymously } from "@/actions/auth-actions"; // Server Action
import { claimTransferCodeAction } from "@/actions/sync-actions"; // Server Action (Kod doğrulama)
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// URL parametrelerini okuyan ve Sync işlemini yöneten iç bileşen
function LoginContent() {
  const [syncCode, setSyncCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  // 1. QR KOD TARAMA SENARYOSU (URL'den kod gelirse otomatik giriş yap)
  useEffect(() => {
    const codeFromUrl = searchParams.get('code');
    if (codeFromUrl) {
      setSyncCode(codeFromUrl);
      handleSyncLogin(codeFromUrl);
    }
  }, [searchParams]);

  // 2. KOD İLE GİRİŞ FONKSİYONU
const handleSyncLogin = async (codeToUse?: string) => {
    const code = codeToUse || syncCode;
    if (!code || code.length < 6) return;

    setLoading(true);
    
    // A. Sunucudan tokenları al
    const res = await claimTransferCodeAction(code);

    if (!res.success || !res.refreshToken || !res.accessToken) {
      toast.error(res.message || 'Kod geçersiz.');
      setLoading(false);
      return;
    }

    // B. Client tarafında oturumu aç
    const { error } = await supabase.auth.setSession({
      refresh_token: res.refreshToken,
      access_token: res.accessToken, 
    });

    if (error) {
      console.error(error)
      toast.error('Oturum açılamadı: ' + error.message);
      setLoading(false);
    } else {
      toast.success('Cihazlar eşleşti! Yönlendiriliyorsunuz...');
      
      // C. Token yenilemeyi tetikle (Garanti olsun)
      await supabase.auth.refreshSession()
      
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 bg-gradient-to-br from-blue-50 dark:from-blue-950/20 via-background dark:via-background to-green-50 dark:to-green-950/20 px-4 min-h-screen">
      {/* Header */}
      <div className="space-y-2 text-center">
        <div className="flex justify-center items-center gap-3">
          <span className="text-6xl">🧱</span>
          <h1 className="font-extrabold text-5xl md:text-6xl tracking-tight">
            Baustein
          </h1>
        </div>
        <p className="font-medium text-muted-foreground text-lg">
          Stein auf Stein — Building German A1.1
        </p>
      </div>

      {/* Login Card */}
      <Card className="shadow-2xl border-2 w-full max-w-md">
        <CardHeader className="space-y-3 text-center">
          <CardTitle className="text-2xl">Hoş Geldin</CardTitle>
          <CardDescription className="text-base">
            Seni grubunda nasıl tanıyalım?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* --- BÖLÜM 1: ANONİM GİRİŞ --- */}
          <form action={signInAnonymously} className="space-y-4">
            <div className="space-y-2 text-left">
              <Label htmlFor="username">Takma Adın</Label>
              <div className="relative">
                <User className="top-4 left-3 absolute w-4 h-4 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  placeholder="Örn: Yiğit"
                  className="pl-9 h-12"
                  required
                  minLength={2}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="gap-2 bg-gradient-to-r from-blue-600 hover:from-blue-700 to-indigo-600 hover:to-indigo-700 w-full h-12 font-semibold text-base transition-all"
              size="lg"
            >
              <LogIn className="w-5 h-5" />
              Başla
            </Button>
          </form>

          {/* --- AYIRICI --- */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Veya Cihaz Bağla
              </span>
            </div>
          </div>

          {/* --- BÖLÜM 2: CİHAZ EŞLEŞTİRME (SYNC) --- */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-indigo-500" />
              Eşleştirme Kodu
            </Label>
            <div className="flex gap-2">
              <Input 
                placeholder="123456" 
                className="text-center font-mono tracking-widest text-lg h-12" 
                maxLength={6}
                value={syncCode}
                onChange={(e) => setSyncCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSyncLogin()}
              />
              <Button 
                size="icon" 
                className="h-12 w-12 shrink-0 bg-indigo-600 hover:bg-indigo-700"
                onClick={() => handleSyncLogin()}
                disabled={loading || syncCode.length < 6}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center px-4">
              Bilgisayarındaki hesabını buraya taşımak için <strong>Profil {'>'} Cihaz Eşleştirme</strong> menüsündeki kodu gir veya QR okut.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="bg-primary/10 px-3 py-1 rounded-full font-mono text-primary text-xs">
            v0.5.0
          </span>
          <span className="text-muted-foreground text-xs">·</span>
          <a
            href="https://github.com/yigityalim/baustein"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground text-xs underline transition-colors"
          >
            Open Source on GitHub
          </a>
        </div>

        {/* Contributors */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-muted-foreground text-xs">Built by</p>
          <a
            href="https://github.com/yigityalim/baustein/graphs/contributors"
            target="_blank"
            rel="noopener noreferrer"
            className="flex -space-x-2 hover:scale-105 transition-transform"
          >
            <Image
              src="https://avatars.githubusercontent.com/yigityalim?s=40"
              alt="Contributor"
              width={32}
              height={32}
              className="border-2 border-background rounded-full"
              unoptimized
            />
          </a>
        </div>
      </div>
    </div>
  );
}

// Suspense Wrapper (Next.js build hatasını önlemek için)
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8" /></div>}>
      <LoginContent />
    </Suspense>
  );
}