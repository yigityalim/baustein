"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { addWordAction } from "@/actions/vocabulary-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const initialState = {
  message: "",
  success: null,
};

export function WordForm() {
  const [state, formAction, isPending] = useActionState(
    addWordAction,
    initialState,
  );
  const [selectedType, setSelectedType] = useState("noun");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success === true) {
      toast.success(state.message || "Kelime eklendi!");
      formRef.current?.reset();
      setSelectedType("noun");
    } else if (state.success === false) {
      toast.error(state.message || "Bir hata oluştu");
    }
  }, [state.success, state.message]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-6 bg-card shadow-sm p-6 border rounded-xl"
    >
      <div className="gap-4 grid grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="word">Almanca Kelime</Label>
          <Input id="word" name="word" placeholder="z.B. Tisch" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Kelime Türü</Label>
          <Select
            name="type"
            defaultValue="noun"
            onValueChange={setSelectedType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="noun">İsim (Noun)</SelectItem>
              <SelectItem value="verb">Fiil (Verb)</SelectItem>
              <SelectItem value="adjective">Sıfat (Adjective)</SelectItem>
              <SelectItem value="phrase">Kalıp (Phrase)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Kategori</Label>
        <Select name="category">
          <SelectTrigger>
            <SelectValue placeholder="Kategori Seç (Opsiyonel)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">Genel</SelectItem>
            <SelectItem value="numbers">Sayılar (Zahlen)</SelectItem>
            <SelectItem value="colors">Renkler (Farben)</SelectItem>
            <SelectItem value="days">Günler/Aylar</SelectItem>
            <SelectItem value="food">Yiyecek/İçecek</SelectItem>
            <SelectItem value="verbs">Fiiller</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedType === "noun" && (
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
      )}

      {selectedType === "verb" && (
        <div className="space-y-4 bg-orange-50 dark:bg-orange-900/10 p-4 border border-orange-200 dark:border-orange-800 rounded-lg dark:text-orange-300">
          <div className="flex justify-between items-center">
            <Label className="font-bold text-orange-700 dark:text-orange-400">
              Fiil Çekimleri (Präsens)
            </Label>
            <span className="text-muted-foreground text-xs">Şimdiki Zaman</span>
          </div>

          <div className="gap-4 grid grid-cols-2">
            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">ich (ben)</Label>
              <Input
                name="conjugation_ich"
                placeholder="mache"
                className="h-8"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">wir (biz)</Label>
              <Input
                name="conjugation_wir"
                placeholder="machen"
                className="h-8"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">du (sen)</Label>
              <Input
                name="conjugation_du"
                placeholder="machst"
                className="h-8"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">ihr (siz)</Label>
              <Input
                name="conjugation_ihr"
                placeholder="macht"
                className="h-8"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">
                er/sie/es (o)
              </Label>
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
      )}

      <div className="gap-4 grid grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="meaning_tr">Türkçe Anlamı</Label>
          <Input
            id="meaning_tr"
            name="meaning_tr"
            placeholder="Örn: Masa"
            required
          />
        </div>

        {selectedType === "noun" && (
          <div className="space-y-2">
            <Label htmlFor="plural">Çoğul Hali</Label>
            <Input id="plural" name="plural" placeholder="die Tische" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="example_sentence">Örnek Cümle (Senin Cümlen)</Label>
        <Textarea
          id="example_sentence"
          name="example_sentence"
          placeholder="Der Tisch ist sehr groß."
          className="resize-none"
        />
        <p className="text-muted-foreground text-xs">
          Kendi kurduğun cümleler akılda daha kalıcıdır.
        </p>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Kaydediliyor..." : "Kaydet ve Ezberle"}
      </Button>
    </form>
  );
}
