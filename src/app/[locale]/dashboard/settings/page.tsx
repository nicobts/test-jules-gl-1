"use client";
import { useTranslations } from "next-intl";

export default function SettingsPage() {
  const t = useTranslations("DashboardPages");
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">{t("settingsTitle")}</h1>
      <p>{t("settingsContent")}</p>
    </div>
  );
}
