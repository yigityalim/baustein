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
    <div className="flex justify-center items-center bg-linear-to-br from-blue-50 to-green-50 min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-3xl">Baustein</CardTitle>
          <CardDescription className="text-lg">
            Stein auf Stein 🧱
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-center">
            Almanca A1.1 öğrenmeye başlamak için giriş yap
          </p>
          <form action={signInAnonymously}>
            <Button type="submit" className="w-full" size="lg">
              Anonim Giriş Yap
            </Button>
          </form>
          <p className="text-muted-foreground text-xs text-center">
            Basit auth — sadece öğrenmeye odaklan
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
