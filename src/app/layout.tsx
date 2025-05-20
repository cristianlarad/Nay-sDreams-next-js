import { Comic_Neue } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import Navbar02Page from "@/components/navbar-02/navbar-02";

const fontSans = Comic_Neue({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.className}  antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <header>
            <Navbar02Page />
          </header>

          <main className="p-6 pt-20">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
