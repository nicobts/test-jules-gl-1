"use client";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Landing.Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 text-center text-gray-600 border-t dark:text-gray-400 dark:border-gray-700">
      <p>{t("copyright", { year: currentYear })}</p>
    </footer>
  );
}
