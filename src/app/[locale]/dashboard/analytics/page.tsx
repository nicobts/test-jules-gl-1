"use client";
import { useTranslations } from "next-intl";

export default function AnalyticsPage() {
  const t = useTranslations("DashboardPages");
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">{t("analyticsTitle")}</h1>
      <p>{t("analyticsContent")}</p>
    </div>
  );
}
