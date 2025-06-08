"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation"; // Added useParams
import { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar"; // Corrected import name
import { useTranslations } from "next-intl";
import { Home, BarChart2, Users, Settings as SettingsIcon } from "lucide-react"; // Renamed Settings to SettingsIcon

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("DashboardNav");
  const locale = typeof params.locale === "string" ? params.locale : "en";

  const navItems = [
    { href: `/${locale}/dashboard`, label: t("overview"), icon: Home, exact: true },
    { href: `/${locale}/dashboard/analytics`, label: t("analytics"), icon: BarChart2 },
    { href: `/${locale}/dashboard/users`, label: t("users"), icon: Users },
    { href: `/${locale}/dashboard/settings`, label: t("settings"), icon: SettingsIcon },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex flex-1 pt-16"> {/* Added pt-16 assuming Navbar is fixed height of h-16 (64px) */}
        <aside className="fixed top-16 left-0 z-40 w-64 h-screen pt-4 pb-4 overflow-y-auto bg-background border-r dark:bg-gray-800 dark:border-gray-700">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href}
                  className={`flex items-center px-4 py-2.5 mx-2 space-x-3 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 transition-colors ${
                    isActive ? "bg-accent text-accent-foreground dark:bg-gray-700 font-semibold" : "text-gray-700 dark:text-gray-300"
                  }`}>
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 p-6 ml-64"> {/* Added ml-64 for sidebar width */}
          {children}
        </main>
      </div>
    </div>
  );
}
