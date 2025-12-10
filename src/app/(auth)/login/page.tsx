import { LogIn } from "lucide-react";
import { signInAnonymously } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
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
            Almanca A1.1'i yazılımcı tarzıyla öğren
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2 text-muted-foreground text-sm">
            <div className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <p>Kayıt gerektirmez</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <p>Gizlilik odaklı anonim giriş</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <p>Hesaplara değil, öğrenmeye odaklan</p>
            </div>
          </div>

          <form action={signInAnonymously}>
            <Button
              type="submit"
              className="gap-2 w-full h-12 font-semibold text-base"
              size="lg"
            >
              <LogIn className="w-5 h-5" />
              Anonim Giriş Yap
            </Button>
          </form>

          <p className="text-muted-foreground text-xs text-center leading-relaxed">
            Verileriniz güvenli şekilde saklanır ve oturumunuza özeldir.
            <br />
            Almanca kelime dağarcığını oluşturmaya hazır mısın?
          </p>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-muted-foreground text-xs text-center">
        <p>
          Açık Kaynak ·{" "}
          <a
            href="https://github.com/yigityalim/baustein"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground underline transition-colors"
          >
            GitHub'da Görüntüle
          </a>
        </p>
      </div>
    </div>
  );
}
