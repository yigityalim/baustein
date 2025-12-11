import { LogIn } from "lucide-react";
import Image from "next/image";
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
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="bg-primary/10 px-3 py-1 rounded-full font-mono text-primary text-xs">
            v0.3.3
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
            {/* GitHub API will show more contributors automatically */}
          </a>
        </div>
      </div>
    </div>
  );
}
