import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import QueryProvider from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Header from "@/components/header";
import ScrollToTop from "@/components/scroll-to-top";
import Footer from "../components/footer";
import { FilterStoreProvider } from "@/components/providers/filter-store-provider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={cn(
          "h-full overflow-y-auto overflow-x-hidden",
          "antialiased",
          geistSans.variable,
          geistMono.variable,
          "font-sans",
          figtree.variable,
        )}
      >
        <body className="min-h-full flex flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <FilterStoreProvider>
              <Header />
              <div className="h-16"></div>
              {children}
              <Footer />
            </FilterStoreProvider>
            <ScrollToTop />
          </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
