// src/app/[locale]/signup/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useParams } from "next/navigation"; // useParams for locale
import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const params = useParams();
  const locale = typeof params.locale === "string" ? params.locale : "en";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const t = useTranslations("Auth");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signup(email, password);
      router.push(`/${locale}`); // Redirect to localized home
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">{t("signupTitle")}</h2>
        {error && <p className="text-sm text-center text-red-500 dark:text-red-400">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">{t("emailLabel")}</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1"/>
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">{t("passwordLabel")}</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1"/>
          </div>
          <Button type="submit" className="w-full">{t("signupButton")}</Button>
        </form>
      </div>
    </div>
  );
}
