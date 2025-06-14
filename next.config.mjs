import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add other configurations here if needed
};

export default withNextIntl(nextConfig);
