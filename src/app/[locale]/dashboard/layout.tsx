"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useParams } from "next/navigation"; // Added useParams
import { useEffect, ReactNode } from "react";
import { useTranslations } from "next-intl";

type Props = {
  children: ReactNode;
  // params: {locale: string}; // params is available via useParams hook
};

export default function ProtectedDashboardLayout({ children }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const t = useTranslations("Auth");
  const locale = typeof params.locale === "string" ? params.locale : "en";

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${locale}/login`);
    }
  }, [user, loading, router, locale]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">{t("loading")}</div>;
  }

  if (!user) {
    // This can be shown briefly or if redirect fails.
    // Alternatively, return null or a minimal layout.
    return <div className="flex items-center justify-center min-h-screen">{t("unauthorizedAccess")}</div>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
