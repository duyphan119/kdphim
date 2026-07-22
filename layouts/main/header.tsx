"use client";


import { buttonVariants } from "@/components/ui/button";
import HeaderSearch from "@/layouts/main/header-search";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import CategoriesMenu from "./categories-menu";
import CountriesMenu from "./countries-menu";
import NavigationMenu from "./navigation-menu";
import YearsMenu from "./years-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type HeaderProps = {
  categories: T_Category[];
  countries: T_Country[];
}

export default function Header({ categories, countries }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const bgClassName = 'border-b border-zinc-800 bg-black shadow-lg'
  return (
    <header
      className={cn('fixed inset-x-0 top-0 z-50 transition-all duration-300', isHome ? (isScrolled ? bgClassName : "lg:bg-transparent") : bgClassName
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Left */}
        <div className="flex items-center gap-12">
          <Link
            href="/"
            title="Đi tới trang chủ"
            className="aspect-[1983/793] block relative h-12"
          >
            <Image
              src={"/images/logo.png"}
              fill={true}
              alt="Logo"
              sizes="(max-width: 1200px) 1983px, 20vw"
              loading="eager"
              unoptimized
            />
          </Link>

          <nav className="hidden items-center gap-4 lg:flex">
            <Link
              href="/"
              className="font-medium text-foreground transition hover:text-red-500 text-sm px-4"
            >
              Trang chủ
            </Link>
            <Link
              href="/phim-hot"
              className="font-medium text-foreground transition hover:text-red-500 text-sm px-4"
            >
              🔥 Phim hot
            </Link>
            <Link
              href="/danh-sach/phim-le"
              className="font-medium text-foreground transition hover:text-red-500 text-sm px-4"
            >
              Phim lẻ
            </Link>

            <Link
              href="/danh-sach/phim-bo"
              className="font-medium text-foreground transition hover:text-red-500 text-sm px-4"
            >
              Phim bộ
            </Link>


            <CategoriesMenu categories={categories} />
            <CountriesMenu countries={countries} />
            <YearsMenu />
          </nav>
        </div>

        {/* Desktop */}
        <Suspense fallback={<div>Loading...</div>}>
          <div className="items-center gap-3 flex">
            <HeaderSearch />
          </div>
        </Suspense>

        {/* Mobile */}
        <div className="lg:hidden">

          <NavigationMenu categories={categories} countries={countries} />
        </div>
      </div>
    </header>
  );
}