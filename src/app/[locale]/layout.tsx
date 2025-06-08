import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import {ReactNode} from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import "../globals.css";

type Props = {
  children: ReactNode;
  params: {locale: string};
};

export default async function LocaleLayout({children, params: {locale}}: Props) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
