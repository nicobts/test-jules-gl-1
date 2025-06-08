"use client";
import { useTranslations } from "next-intl";

export default function UsersPage() {
  const t = useTranslations("DashboardPages");
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">{t("usersTitle")}</h1>
      <p>{t("usersContent")}</p>
    </div>
  );
}
