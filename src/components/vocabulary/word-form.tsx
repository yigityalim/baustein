"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { addWordAction } from "@/actions/vocabulary-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { NounFields } from "./noun-fields";
import { VerbFields } from "./verb-fields";

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
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (state.success === true) {
      toast.success(state.message || "Kelime eklendi!");
      formRef.current?.reset();
      setSelectedType("noun");
      setIsPublic(false);
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
            value={selectedType}
            onValueChange={setSelectedType}
          >
            <SelectTrigger>
              <SelectValue />
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

      <div className="flex items-center space-x-3 bg-muted/30 p-2.5 border rounded-md">
        <Switch
          name="is_public"
          id="public-mode"
          checked={isPublic}
          onCheckedChange={setIsPublic}
        />
        <Label
          htmlFor="public-mode"
          className="mb-0 font-medium text-sm cursor-pointer"
        >
          Grubumla Paylaş
        </Label>
      </div>

      {selectedType === "noun" && <NounFields />}
      {selectedType === "verb" && <VerbFields />}

      <div className="space-y-2">
        <Label htmlFor="meaning_tr">Türkçe Anlamı</Label>
        <Input
          id="meaning_tr"
          name="meaning_tr"
          placeholder="Örn: Masa"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="example_sentence">Örnek Cümle</Label>
        <Textarea
          id="example_sentence"
          name="example_sentence"
          placeholder="Der Tisch ist groß."
          className="resize-none"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Kaydediliyor..." : "Kaydet ve Ezberle"}
      </Button>
    </form>
  );
}
