"use client";

import { Download, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  type ExportData,
  exportUserData,
  importUserData,
} from "@/actions/data-actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DataManagement() {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importData, setImportData] = useState<ExportData | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const data = await exportUserData();
      if (!data) {
        toast.error("Veri dışa aktarılamadı");
        return;
      }

      // JSON dosyası oluştur ve indir
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `baustein-backup-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success(
        `${data.vocabulary.length} kelime ve ${data.notes.length} not dışa aktarıldı`,
      );
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Dışa aktarma sırasında bir hata oluştu");
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as ExportData;
        setImportData(data);
        setIsImportDialogOpen(true);
      } catch {
        toast.error("Geçersiz dosya formatı");
      }
    };
    reader.readAsText(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImport = async () => {
    if (!importData) return;

    setIsImporting(true);
    try {
      const result = await importUserData(importData);
      if (result.success) {
        toast.success(result.message);
        setIsImportDialogOpen(false);
        window.location.reload(); // Sayfayı yenile
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Import error:", error);
      toast.error("İçe aktarma sırasında bir hata oluştu");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Veri Yönetimi</CardTitle>
          <CardDescription>
            Verilerinizi yedekleyin veya başka bir cihaza aktarın
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="gap-2 w-full"
            >
              <Download className="w-4 h-4" />
              {isExporting ? "Dışa aktarılıyor..." : "Verileri Dışa Aktar"}
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="gap-2 w-full"
            >
              <Upload className="w-4 h-4" />
              Verileri İçe Aktar
            </Button>
          </div>

          <p className="text-muted-foreground text-xs">
            💡 Düzenli yedek almayı unutma! Tarayıcı çerezlerini temizlersen
            veriler kaybolabilir.
          </p>
        </CardContent>
      </Card>

      <AlertDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Verileri İçe Aktar</AlertDialogTitle>
            <AlertDialogDescription>
              {importData && (
                <>
                  <strong>{importData.vocabulary.length}</strong> kelime ve{" "}
                  <strong>{importData.notes.length}</strong> not içe
                  aktarılacak.
                  <br />
                  <br />
                  Mevcut verileriniz silinmeyecek, yeni veriler eklenecek.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction onClick={handleImport} disabled={isImporting}>
              {isImporting ? "Yükleniyor..." : "İçe Aktar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
