// eslint-disable-next-line import/order
import { Comic_Neue } from "next/font/google";

import "./globals.css";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";

import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { Footer } from "@/components/footer/footer";
import Navbar02Page from "@/components/navbar-02/navbar-02";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
const fontSans = Comic_Neue({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang="en" suppressHydrationWarning title="Nay's Dreams">
      <body className={`${fontSans.className}  antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <header>
              <Navbar02Page />
              <div className="flex items-center gap-3"></div>
            </header>

            <main className="p-6 pt-20">
              {children}
              <Toaster />
            </main>
            <Footer />
            <CookieConsentBanner />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
