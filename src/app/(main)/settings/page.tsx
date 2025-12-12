import type { Metadata } from "next";
import { SettingsContent } from "@/components/settings/settings-content";

export const metadata: Metadata = {
  title: "Ayarlar",
  description:
    "Profil ayarlarınız, bildirim tercihleri ve uygulama yapılandırması.",
};

export default function SettingsPage() {
  return <SettingsContent />;
}
