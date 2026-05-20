"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { exampleCategories } from "@/lib/category";
import { exampleCountries } from "@/lib/country";
import { getYears } from "@/lib/year";
import {
  DashboardSquare01Icon,
  Earth,
  Fire,
  Home,
  Menu,
  MoleculesIcon,
  Search,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Suspense } from "react";
import HeaderSearch from "./header-search";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="bg-background fixed top-0 inset-x-0 z-10 ">
      <div className="flex justify-between items-center gap-2 h-16 _container">
        <Drawer direction="left">
          <DrawerTrigger
            onClick={(e) => {
              // chặn warning Blocked aria-hidden on an element...
              e.currentTarget.blur();
            }}
            className="py-4 cursor-pointer outline-0"
          >
            <HugeiconsIcon icon={Menu} color="#fff" size={20} />
          </DrawerTrigger>
          <DrawerContent className="bg-muted">
            <DrawerHeader className="sr-only">
              <DrawerTitle>Menu</DrawerTitle>
              <DrawerDescription>Navigation Menu</DrawerDescription>
            </DrawerHeader>
            <div className="no-scrollbar overflow-y-auto">
              <Link
                href="/"
                className="flex items-center gap-1.5 px-2 py-2 rounded-sm text-foreground hover:text-destructive transition-colors duration-200 overflow-hidden  hover:bg-linear-to-r hover:from-destructive/20 hover:to-transparent relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-0 before:w-1 before:rounded-full before:bg-destructive before:opacity-0 before:transition-all before:duration-100 hover:before:h-full hover:before:opacity-100"
              >
                <HugeiconsIcon icon={Home} size={18} />
                Trang chủ
              </Link>
              <Link
                href="/phim-hot"
                className="flex items-center gap-1.5 px-2 py-2 rounded-sm text-foreground hover:text-destructive overflow-hidden transition-all duration-200 hover:bg-linear-to-r hover:from-destructive/20 hover:to-transparent relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-0 before:w-1 before:rounded-full before:bg-destructive before:opacity-0 before:transition-all before:duration-100 hover:before:h-full hover:before:opacity-100"
              >
                <HugeiconsIcon icon={Fire} size={18} />
                Phim hot
              </Link>
              <Accordion type="multiple">
                <AccordionItem value="item-1" className="">
                  <AccordionTrigger className="pl-2 py-2 cursor-pointer">
                    <HugeiconsIcon icon={DashboardSquare01Icon} size={18} /> Thể
                    loại
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2">
                      {exampleCategories.map((category) => (
                        <Link
                          key={category.name}
                          href={`/the-loai/${category.slug}`}
                          className="col-span-1 no-underline p-1 hover:text-destructive transition-colors duration-200"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="">
                  <AccordionTrigger className="pl-2 py-2 cursor-pointer">
                    <HugeiconsIcon icon={Earth} size={18} /> Quốc gia
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2">
                      {exampleCountries.map((country) => (
                        <Link
                          key={country.name}
                          href={`/quoc-gia/${country.slug}`}
                          className="col-span-1 no-underline p-1 hover:text-destructive transition-colors duration-200"
                        >
                          {country.name}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="">
                  <AccordionTrigger className="pl-2 py-2 cursor-pointer">
                    <HugeiconsIcon icon={MoleculesIcon} size={18} /> Năm
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-3">
                      {getYears().map((year) => (
                        <Link
                          key={year}
                          href={`/nam/${year}`}
                          className="col-span-1 no-underline p-1 hover:text-destructive transition-colors duration-200"
                        >
                          {year}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </DrawerContent>
        </Drawer>
        <Link href="/" className="">
          KDPhim
        </Link>
        <Suspense
          fallback={<HugeiconsIcon icon={Search} color="#fff" size={14} />}
        >
          <HeaderSearch />
        </Suspense>
      </div>
    </header>
  );
}
