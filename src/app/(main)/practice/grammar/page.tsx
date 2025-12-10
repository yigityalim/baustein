import { Ban, HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function GrammarHubPage() {
  return (
    <div className="space-y-8 mx-auto px-4 py-10 max-w-7xl container">
      <div className="space-y-2 text-center">
        <h1 className="font-bold text-3xl">Gramer Laboratuvarı</h1>
        <p className="text-muted-foreground">
          Derste gördüğün kuralları burada parçala.
        </p>
      </div>

      <div className="gap-6 grid md:grid-cols-3">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Ban className="text-red-500" />
              <CardTitle>Negation (Olumsuzlama)</CardTitle>
            </div>
            <CardDescription>
              "nicht" ve "kein" kullanımı. Cümlenin neresine gelir?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground text-sm italic">
              "Er wohnt <u>nicht</u> in Hamburg."
            </p>
            <Link href="/practice/sentences?topic=negation">
              <Button className="w-full" variant="outline">
                Antrenmana Başla
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="text-blue-500" />
              <CardTitle>Smalltalk & Tanışma</CardTitle>
            </div>
            <CardDescription>
              Resmi (Sie) ve Samimi (du) diyaloglar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground text-sm italic">
              "Wie geht es <u>Ihnen</u>?"
            </p>
            <Link href="/practice/sentences?topic=smalltalk">
              <Button className="w-full" variant="outline">
                Antrenmana Başla
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="text-orange-500" />
              <CardTitle>W-Fragen</CardTitle>
            </div>
            <CardDescription>
              Wo, Woher, Wie, Was... Soru kalıpları ve fiil pozisyonu.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground text-sm italic">
              "<u>Woher</u> kommst du?"
            </p>
            <Link href="/practice/sentences?topic=w_fragen">
              <Button className="w-full" variant="outline">
                Antrenmana Başla
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
