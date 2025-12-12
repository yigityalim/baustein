"use client";

import { Bell, BellOff, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
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
import { useNotification } from "@/hooks/use-notification";
import { SyncGenerator } from "@/components/sync/sync-generator";
import { resetAllData } from "@/actions/auth-actions"; // Bu action'ı aşağıda kontrol edeceğiz

export function SettingsContent() {
  const { permission, requestPermission } = useNotification();

  return (
    <div className="space-y-8 mx-auto px-4 md:px-6 py-6 md:py-8 max-w-4xl container">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Ayarlar</h1>
        <p className="text-muted-foreground">Uygulama tercihlerini yönet</p>
      </div>

      {/* 1. BÖLÜM: BİLDİRİMLER */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Bildirimler
          </CardTitle>
          <CardDescription>
            Hatırlatıcılar ve rekabet bildirimleri
          </CardDescription>
        </CardHeader>
        <CardContent>
           {/* ... Bildirim kodları aynı kalsın ... */}
           <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg">
            <div className="space-y-1">
              <p className="font-medium">Masaüstü Bildirimleri</p>
              <p className="text-muted-foreground text-sm">Tarayıcı bildirimlerini yönet</p>
            </div>
            {permission === "default" && <Button onClick={requestPermission} variant="outline">İzin Ver</Button>}
            {permission === "granted" && <span className="text-green-600 text-sm font-medium flex items-center gap-1"><Bell className="w-4 h-4"/> Aktif</span>}
            {permission === "denied" && <span className="text-red-600 text-sm font-medium flex items-center gap-1"><BellOff className="w-4 h-4"/> Engelli</span>}
           </div>
        </CardContent>
      </Card>

      {/* 2. BÖLÜM: CİHAZ EŞLEŞTİRME */}
      <SyncGenerator />

      {/* 3. BÖLÜM: DANGER ZONE (TEHLİKELİ BÖLGE) */}
      <Card className="border-destructive/50 bg-destructive/5 overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Tehlikeli Bölge
          </CardTitle>
          <CardDescription>
            Bu işlemler geri alınamaz ve <strong>bağlı olan tüm cihazlarını etkiler.</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-background/50 p-4 rounded-lg border border-destructive/20">
            <div className="space-y-1">
              <p className="font-medium text-foreground">Hesabı Sıfırla</p>
              <p className="text-muted-foreground text-sm">
                Tüm kelimeleri, notları, XP ve seviye ilerlemeni kalıcı olarak siler.
              </p>
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="shrink-0 gap-2">
                  <Trash2 className="w-4 h-4" />
                  Verileri Sil
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Kesinlikle emin misin?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bu işlem geri alınamaz. Bu hesaba bağlı tüm veriler (kelimeler, notlar, puanlar) 
                    <strong>tüm cihazlarından</strong> kalıcı olarak silinecek.
                    <br/><br/>
                    Oturumun kapatılacak ve ana sayfaya yönlendirileceksin.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>İptal</AlertDialogCancel>
                  <form action={resetAllData}>
                    <AlertDialogAction type="submit" className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Evet, Her Şeyi Sil
                    </AlertDialogAction>
                  </form>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}