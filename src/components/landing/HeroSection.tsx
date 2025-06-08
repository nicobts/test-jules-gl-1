"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function HeroSection() {
  const t = useTranslations("Landing.Hero");
  const params = useParams();
  const locale = typeof params.locale === "string" ? params.locale : "en";
  return (
    <section id="home" className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center bg-gradient-to-b from-background to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-16">
      <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl text-gray-900 dark:text-white">{t("title")}</h1>
      <p className="mb-10 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl">{t("subtitle")}</p>
      <Link href={`/${locale}/signup`} passHref>
        <Button size="lg" className="px-8 py-3 text-lg">{t("ctaButton")}</Button>
      </Link>
    </section>
  );
}
