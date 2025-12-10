"use client";

import { Pencil } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { updateWordAction } from "@/actions/vocabulary-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

export function EditWordDialog({ word }: { word: any }) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(updateWordAction, {
    message: "",
    success: null,
  });

  const [selectedType, setSelectedType] = useState(word.type);

  useEffect(() => {
    if (state.success === true) {
      toast.success("Güncellendi!");
      setOpen(false);
    } else if (state.success === false) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-blue-50 w-8 h-8 text-blue-500 hover:text-blue-700"
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Kelimeyi Düzenle</DialogTitle>
          <DialogDescription>Hatalı girişi düzelt ve kaydet.</DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4 py-2">
          <input type="hidden" name="id" value={word.id} />

          <div className="gap-3 grid grid-cols-1 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Almanca</Label>
              <Input name="word" defaultValue={word.word} required />
            </div>

            <div className="space-y-2">
              <Label>Tür</Label>
              <Select
                name="type"
                defaultValue={word.type}
                onValueChange={setSelectedType}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="noun">İsim</SelectItem>
                  <SelectItem value="verb">Fiil</SelectItem>
                  <SelectItem value="adjective">Sıfat</SelectItem>
                  <SelectItem value="phrase">Kalıp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedType === "noun" && (
            <div className="space-y-2 bg-muted/50 p-3 border border-dashed rounded">
              <Label>Artikel</Label>
              <RadioGroup
                name="article"
                defaultValue={word.article || "der"}
                className="flex flex-wrap gap-3"
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem
                    value="der"
                    id="edit-der"
                    className="text-blue-600"
                  />
                  <Label
                    htmlFor="edit-der"
                    className="text-blue-700 cursor-pointer"
                  >
                    Der
                  </Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem
                    value="die"
                    id="edit-die"
                    className="text-red-600"
                  />
                  <Label
                    htmlFor="edit-die"
                    className="text-red-700 cursor-pointer"
                  >
                    Die
                  </Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem
                    value="das"
                    id="edit-das"
                    className="text-green-600"
                  />
                  <Label
                    htmlFor="edit-das"
                    className="text-green-700 cursor-pointer"
                  >
                    Das
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          <div className="gap-3 grid grid-cols-1 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Türkçe</Label>
              <Input
                name="meaning_tr"
                defaultValue={word.meaning_tr}
                required
              />
            </div>
            {selectedType === "noun" && (
              <div className="space-y-2">
                <Label>Çoğul</Label>
                <Input name="plural" defaultValue={word.plural || ""} />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Örnek Cümle</Label>
            <Textarea
              name="example_sentence"
              defaultValue={word.example_sentence || ""}
              className="h-20 resize-none"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="submit" className="w-full sm:w-auto">
              Değişiklikleri Kaydet
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
