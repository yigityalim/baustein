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
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const initialState = {
  message: "",
  success: null,
};

const articleStyles = {
  der: "text-blue-700 bg-blue-50 border-blue-200 hover:bg-blue-100",
  die: "text-red-700 bg-red-50 border-red-200 hover:bg-red-100",
  das: "text-green-700 bg-green-50 border-green-200 hover:bg-green-100",
};

export function WordForm() {
  const [state, formAction, isPending] = useActionState(addWordAction, initialState);
  
  const [selectedType, setSelectedType] = useState("noun");
  const [selectedArticle, setSelectedArticle] = useState<string | undefined>(undefined);
  const [showDetails, setShowDetails] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success === true) {
      toast.success("Kelime eklendi!");
      formRef.current?.reset();
      setSelectedType("noun");
      setSelectedArticle(undefined);
      setShowDetails(false);
    } else if (state.success === false) {
      toast.error(state.message || "Bir hata oluştu");
    }
  }, [state.success, state.message]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="bg-card shadow-sm border rounded-xl overflow-hidden"
    >
      <div className="p-5 space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="word" className="text-muted-foreground text-xs font-semibold uppercase">
              Kelime (Almanca)
            </Label>
            <Input 
              id="word" 
              name="word" 
              placeholder="z.B. Tisch" 
              className="text-lg font-medium"
              autoFocus
              required 
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="meaning_tr" className="text-muted-foreground text-xs font-semibold uppercase">
              Anlamı (Türkçe)
            </Label>
            <Input 
              id="meaning_tr" 
              name="meaning_tr" 
              placeholder="Örn: Masa" 
              required 
            />
          </div>
        </div>

        <div className="flex items-end gap-3">
          <div className="flex-1 space-y-1.5">
            <Label className="text-muted-foreground text-xs font-semibold uppercase">Tür</Label>
            <Select name="type" value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="noun">İsim (Noun)</SelectItem>
                <SelectItem value="verb">Fiil (Verb)</SelectItem>
                <SelectItem value="adjective">Sıfat</SelectItem>
                <SelectItem value="phrase">Kalıp</SelectItem>
                <SelectItem value="other">Diğer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedType === "noun" && (
            <div className="w-1/3 space-y-1.5 animate-in fade-in zoom-in-95 duration-200">
              <Label className="text-muted-foreground text-xs font-semibold uppercase">Artikel</Label>
              <Select 
                name="article" 
                value={selectedArticle} 
                onValueChange={setSelectedArticle}
              >
                <SelectTrigger 
                  className={cn(
                    "font-bold transition-colors duration-300", 
                    selectedArticle ? articleStyles[selectedArticle as keyof typeof articleStyles] : "border-dashed text-muted-foreground"
                  )}
                >
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="der" className="text-blue-600 focus:bg-blue-50 focus:text-blue-700 font-medium cursor-pointer">
                    🔵 Der
                  </SelectItem>
                  <SelectItem value="die" className="text-red-600 focus:bg-red-50 focus:text-red-700 font-medium cursor-pointer">
                    🔴 Die
                  </SelectItem>
                  <SelectItem value="das" className="text-green-600 focus:bg-green-50 focus:text-green-700 font-medium cursor-pointer">
                    🟢 Das
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <Button 
            type="submit" 
            className={cn(
                "w-full font-semibold transition-all duration-300",
                selectedArticle === 'der' && "bg-blue-600 hover:bg-blue-700 text-blue-100",
                selectedArticle === 'die' && "bg-red-600 hover:bg-red-700 text-red-100",
                selectedArticle === 'das' && "bg-green-600 hover:bg-green-700 text-green-100"
            )} 
            disabled={isPending}
        >
          {isPending ? "Kaydediliyor..." : <><Plus className="mr-2 w-4 h-4"/> Hızlı Kaydet</>}
        </Button>
      </div>

      <div 
        onClick={() => setShowDetails(!showDetails)}
        className="flex justify-center items-center bg-muted/30 hover:bg-muted/50 py-2 border-t cursor-pointer transition-colors"
      >
        <span className="flex items-center text-muted-foreground text-xs font-medium select-none">
          {showDetails ? "Detayları Gizle" : "Daha Fazla Detay (Opsiyonel)"}
          {showDetails ? <ChevronUp className="ml-1 w-3 h-3"/> : <ChevronDown className="ml-1 w-3 h-3"/>}
        </span>
      </div>

      {showDetails && (
        <div className="bg-muted/10 p-5 pt-2 border-t space-y-4 animate-in slide-in-from-top-2 duration-200">
            
            <div className="space-y-1.5">
               <Label className="text-xs">Kategori</Label>
               <Select name="category" defaultValue="general">
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Genel</SelectItem>
                    <SelectItem value="verbs">Fiiller</SelectItem>
                    <SelectItem value="numbers">Sayılar</SelectItem>
                    <SelectItem value="colors">Renkler</SelectItem>
                    <SelectItem value="food">Yiyecek/İçecek</SelectItem>
                  </SelectContent>
                </Select>
            </div>

            {selectedType === "noun" && (
                <div className="space-y-1.5">
                    <Label className="text-xs">Çoğul Hali (Plural)</Label>
                    <Input name="plural" placeholder="z.B. Tische" className="h-9" />
                </div>
            )}

            {selectedType === "verb" && (
                <div className="space-y-2 border-border/50 bg-background/50 p-3 border rounded-md">
                    <Label className="text-xs font-semibold">Fiil Çekimleri</Label>
                    <div className="gap-2 grid grid-cols-2">
                        <Input name="conjugation_ich" placeholder="ich" className="h-8 text-sm" />
                        <Input name="conjugation_du" placeholder="du" className="h-8 text-sm" />
                        <Input name="conjugation_er_sie_es" placeholder="er/sie/es" className="h-8 text-sm" />
                        <Input name="conjugation_wir" placeholder="wir" className="h-8 text-sm" />
                        <Input name="conjugation_ihr" placeholder="ihr" className="h-8 text-sm" />
                        <Input name="conjugation_sie_Sie" placeholder="sie/Sie" className="h-8 text-sm" />
                    </div>
                </div>
            )}

            <div className="space-y-1.5">
                <Label className="text-xs">Örnek Cümle</Label>
                <Textarea 
                  name="example_sentence" 
                  placeholder="Kelimeyi cümle içinde kullan..." 
                  className="min-h-[60px] resize-none"
                />
            </div>
        </div>
      )}
    </form>
  );
}