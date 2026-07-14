import { ThemeProvider } from "@/components/providers/theme-provider";
import ScrollToTop from "@/components/scroll-to-top";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import Header from "@/layouts/main/header";
import Footer from "@/layouts/main/footer";
import { categoriesApi } from "@/features/categories/api";
import { countriesApi } from "@/features/countries/api";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KDPhim - Xem phim online miễn phí chất lượng cao",
  description:
    "KDPhim là trang web xem phim online miễn phí, cập nhật phim mới nhất và dễ dàng tìm kiếm. Xem phim chất lượng cao với giao diện thân thiện và trải nghiệm mượt mà.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await Promise.allSettled([countriesApi.items(), categoriesApi.items()]);

  const countries = data[0].status === 'fulfilled' ? data[0].value : [];
  const categories = data[1].status === 'fulfilled' ? data[1].value : [];
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full overflow-y-auto",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        figtree.variable,
      )}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="#ef4444" />
          <Header countries={countries} categories={categories} />
          {children}
          <Footer />
          <ScrollToTop />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
