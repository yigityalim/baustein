import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function VerbFields() {
  return (
    <div className="space-y-4 bg-orange-50 dark:bg-orange-900/10 slide-in-from-top-2 p-4 border border-orange-200 dark:border-orange-800 rounded-lg animate-in fade-in">
      <div className="flex justify-between items-center">
        <Label className="font-bold text-orange-700 dark:text-orange-400">
          Fiil Çekimleri (Präsens)
        </Label>
        <span className="text-muted-foreground text-xs">Şimdiki Zaman</span>
      </div>

      <div className="gap-4 grid grid-cols-2">
        <div className="space-y-1">
          <Label className="text-muted-foreground text-xs">ich (ben)</Label>
          <Input name="conjugation_ich" placeholder="mache" className="h-8" />
        </div>
        <div className="space-y-1">
          <Label className="text-muted-foreground text-xs">wir (biz)</Label>
          <Input name="conjugation_wir" placeholder="machen" className="h-8" />
        </div>

        <div className="space-y-1">
          <Label className="text-muted-foreground text-xs">du (sen)</Label>
          <Input name="conjugation_du" placeholder="machst" className="h-8" />
        </div>
        <div className="space-y-1">
          <Label className="text-muted-foreground text-xs">ihr (siz)</Label>
          <Input name="conjugation_ihr" placeholder="macht" className="h-8" />
        </div>

        <div className="space-y-1">
          <Label className="text-muted-foreground text-xs">er/sie/es (o)</Label>
          <Input
            name="conjugation_er_sie_es"
            placeholder="macht"
            className="h-8"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-muted-foreground text-xs">
            sie/Sie (onlar/Siz)
          </Label>
          <Input
            name="conjugation_sie_Sie"
            placeholder="machen"
            className="h-8"
          />
        </div>
      </div>
    </div>
  );
}
