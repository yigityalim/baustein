"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";
import { resetAllData } from "@/actions/auth-actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ResetDataButtonProps {
  variant?: "ghost" | "default" | "destructive";
  size?: "sm" | "default" | "lg";
  className?: string;
  showIcon?: boolean;
  showText?: boolean;
  textLabel?: string;
}

export function ResetDataButton({
  variant = "ghost",
  size = "sm",
  className = "",
  showIcon = true,
  showText = true,
  textLabel = "Verileri Sıfırla",
}: ResetDataButtonProps) {
  const [open, setOpen] = useState(false);

  const handleReset = async () => {
    await resetAllData();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          {showIcon && <LogOut className="w-4 h-4" />}
          {showText && <span>{textLabel}</span>}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tüm verileri silmek istediğine emin misin?</AlertDialogTitle>
          <AlertDialogDescription>
            Bu işlem geri alınamaz. Tüm kelimeler, notlar ve ilerleme kaydın
            kalıcı olarak silinecek. Yeni bir başlangıç yapacaksın.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>İptal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleReset}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Evet, Tümünü Sil
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
