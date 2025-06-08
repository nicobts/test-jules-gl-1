"use client";
import { useTranslations } from "next-intl";

const FeatureIcon = ({ children }: { children: React.ReactNode }) => <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary text-2xl">{children}</div>;

export default function FeaturesSection() {
  const t = useTranslations("Landing.Features");
  const features = [
    { id: 1, title: t("feature1Title"), description: t("feature1Desc"), icon: "⚡️" },
    { id: 2, title: t("feature2Title"), description: t("feature2Desc"), icon: "📊" },
    { id: 3, title: t("feature3Title"), description: t("feature3Desc"), icon: "🔗" },
    { id: 4, title: t("feature4Title"), description: t("feature4Desc"), icon: "🛠️" },
  ];

  return (
    <section id="features" className="py-16 bg-background dark:bg-gray-800 md:py-24">
      <div className="container px-4 mx-auto text-center">
        <h2 className="mb-16 text-4xl font-bold text-gray-900 dark:text-white">{t("title")}</h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col items-center p-6 transition-shadow duration-300 ease-in-out bg-card rounded-lg shadow-md hover:shadow-xl dark:bg-gray-700">
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
