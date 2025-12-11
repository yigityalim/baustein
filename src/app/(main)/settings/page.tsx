"use client";

import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNotification } from "@/hooks/use-notification";

export default function SettingsPage() {
  const { permission, requestPermission } = useNotification();

  return (
    <div className="space-y-6 mx-auto px-4 md:px-6 py-6 md:py-8 max-w-4xl container">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Ayarlar</h1>
        <p className="text-muted-foreground">Uygulama tercihlerini yönet</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Bildirimler
          </CardTitle>
          <CardDescription>
            Rekabet sırasında önemli olaylardan haberdar ol
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg">
            <div className="space-y-1">
              <p className="font-medium">Masaüstü Bildirimleri</p>
              <p className="text-muted-foreground text-sm">
                Biri seni liderlik tablosunda geçtiğinde bildirim al
              </p>
            </div>
            <div className="flex items-center gap-3">
              {permission === "granted" && (
                <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-1.5 rounded-full text-green-700 dark:text-green-400 text-sm">
                  <Bell className="w-4 h-4" />
                  Aktif
                </div>
              )}
              {permission === "denied" && (
                <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-3 py-1.5 rounded-full text-red-700 dark:text-red-400 text-sm">
                  <BellOff className="w-4 h-4" />
                  Engelli
                </div>
              )}
              {permission === "default" && (
                <Button onClick={requestPermission}>İzin Ver</Button>
              )}
            </div>
          </div>

          {permission === "denied" && (
            <div className="bg-destructive/10 p-4 border border-destructive/20 rounded-lg text-sm">
              <p className="font-semibold text-destructive">
                Bildirimler engellendi
              </p>
              <p className="mt-1 text-muted-foreground">
                Tarayıcı ayarlarından bildirimleri tekrar aktifleştirmelisin.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
