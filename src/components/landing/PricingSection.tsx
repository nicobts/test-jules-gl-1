"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PricingSection() {
  const t = useTranslations("Landing.Pricing");
  const params = useParams();
  const locale = typeof params.locale === "string" ? params.locale : "en";
  const tiers = [
    {
      name: t("freeTierName"),
      price: t("freeTierPrice"),
      features: [t("freeTierFeature1"), t("freeTierFeature2"), t("freeTierFeature3")],
      buttonText: t("freeTierButton"),
      href: `/${locale}/signup`
    },
    {
      name: t("proTierName"),
      price: t("proTierPrice"),
      features: [t("proTierFeature1"), t("proTierFeature2"), t("proTierFeature3")],
      buttonText: t("proTierButton"),
      href: `/${locale}/signup?plan=pro`,
      primary: true
    },
  ];

  return (
    <section id="pricing" className="py-16 bg-gray-50 dark:bg-gray-900 md:py-24">
      <div className="container px-4 mx-auto text-center">
        <h2 className="mb-16 text-4xl font-bold text-gray-900 dark:text-white">{t("title")}</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto items-stretch">
          {tiers.map((tier) => (
            <Card key={tier.name} className={`flex flex-col ${tier.primary ? "border-primary border-2 shadow-lg" : "shadow-md"}`}>
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-semibold">{tier.name}</CardTitle>
                <CardDescription className="text-4xl font-extrabold my-2">{tier.price}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-left text-sm">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Link href={tier.href} className="w-full" passHref>
                  <Button className={`w-full text-md ${tier.primary ? "" : "variant-outline"}`}>{tier.buttonText}</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
