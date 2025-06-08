"use client";
import { useTranslations } from "next-intl";

export default function DashboardOverviewPage() {
  const t = useTranslations("DashboardPages");
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">{t("overviewTitle")}</h1>
      <p>{t("overviewContent")}</p>
    </div>
  );
}
