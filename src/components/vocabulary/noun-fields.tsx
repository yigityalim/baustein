import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function NounFields() {
  return (
    <div className="space-y-4 slide-in-from-top-2 animate-in fade-in">
      <div className="space-y-3 bg-muted/30 p-4 border-2 border-dashed rounded-lg">
        <Label>Artikel (Der/Die/Das)</Label>
        <RadioGroup name="article" defaultValue="der" className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="der"
              id="r1"
              className="border-blue-600 focus:ring-blue-600 text-blue-600"
            />
            <Label
              htmlFor="r1"
              className="font-bold text-blue-700 cursor-pointer"
            >
              DER (Mavi)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="die"
              id="r2"
              className="border-red-600 focus:ring-red-600 text-red-600"
            />
            <Label
              htmlFor="r2"
              className="font-bold text-red-700 cursor-pointer"
            >
              DIE (Kırmızı)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="das"
              id="r3"
              className="border-green-600 focus:ring-green-600 text-green-600"
            />
            <Label
              htmlFor="r3"
              className="font-bold text-green-700 cursor-pointer"
            >
              DAS (Yeşil)
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="plural">Çoğul Hali</Label>
        <Input id="plural" name="plural" placeholder="die Tische" />
      </div>
    </div>
  );
}
