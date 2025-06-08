"use client";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const t = useTranslations("Landing.Navbar");
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const currentLocale = typeof params.locale === "string" ? params.locale : "en";

  const handleLanguageChange = (newLocale: string) => {
    const basePath = pathname.startsWith(`/${currentLocale}`) ? pathname.substring(`/${currentLocale}`.length) : pathname;
    router.push(`/${newLocale}${basePath || "/"}`, { scroll: false });
  };

  return (
    <nav className="sticky top-0 z-50 w-full py-3 bg-background/80 backdrop-blur-md shadow-sm dark:bg-gray-800/80">
      <div className="container flex items-center justify-between mx-auto">
        <Link href={`/${currentLocale}`} className="text-2xl font-bold text-primary">SaaSCo</Link>
        <div className="items-center hidden space-x-6 md:flex">
          <Link href={`/${currentLocale}/#home`} className="text-sm font-medium hover:text-primary transition-colors">{t("home")}</Link>
          <Link href={`/${currentLocale}/#features`} className="text-sm font-medium hover:text-primary transition-colors">{t("features")}</Link>
          <Link href={`/${currentLocale}/#pricing`} className="text-sm font-medium hover:text-primary transition-colors">{t("pricing")}</Link>
        </div>
        <div className="flex items-center space-x-2">
          {currentLocale === "en" ? (
            <Button variant="ghost" size="sm" onClick={() => handleLanguageChange("es")}>ES</Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => handleLanguageChange("en")}>EN</Button>
          )}

          {loading ? <div className="w-12 h-8 bg-gray-200 rounded-md animate-pulse"></div> : user ? (
            <>
              <Link href={`/${currentLocale}/dashboard`} passHref>
                <Button variant="outline" size="sm">{t("dashboard")}</Button>
              </Link>
              <Button onClick={logout} size="sm">Logout</Button>
            </>
          ) : (
            <>
              <Link href={`/${currentLocale}/login`} passHref>
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link href={`/${currentLocale}/signup`} passHref>
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
