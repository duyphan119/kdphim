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
import { exampleCategories, getCategories } from "@/lib/category/data";
import { exampleCountries, getCountries } from "@/lib/country/data";
import {
  Clock02Icon,
  DashboardSquare01Icon,
  Earth,
  Home,
  Menu,
  MoleculesIcon,
  Search,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useFilterStore } from "./providers/filter-store-provider";
import { useEffect } from "react";

type Props = {};

export default function Header({}: Props) {
  const { data: dataCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    initialData: exampleCategories,
  });

  const { data: dataCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    initialData: exampleCountries,
  });

  const {
    categories,
    countries,
    years,
    setCategories,
    setCountries,
    setYears,
  } = useFilterStore((state) => state);

  useEffect(() => {
    if (dataCategories) {
      setCategories(dataCategories);
    }
  }, [dataCategories]);

  useEffect(() => {
    if (dataCountries) {
      setCountries(dataCountries);
    }
  }, [dataCountries]);

  useEffect(() => {
    setYears(
      Array.from(
        { length: new Date().getFullYear() - 1970 + 1 },
        (_, i) => 1970 + i,
      ).reverse(),
    );
  }, []);
  return (
    <header className="bg-background fixed top-0 inset-x-0 z-10">
      <div className="flex justify-between items-center h-16">
        <Drawer direction="left">
          <DrawerTrigger
            onClick={(e) => {
              // chặn warning Blocked aria-hidden on an element...
              e.currentTarget.blur();
            }}
            className="p-4 cursor-pointer"
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
              <Accordion type="multiple">
                <AccordionItem value="item-1" className="">
                  <AccordionTrigger className="pl-2 py-2 cursor-pointer">
                    <HugeiconsIcon icon={DashboardSquare01Icon} size={18} /> Thể
                    loại
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2">
                      {dataCategories.map((category) => (
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
                      {dataCountries.map((country) => (
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
                      {years.map((year) => (
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
                <Link
                  href="/"
                  className="flex items-center gap-1.5 px-2 py-2 rounded-sm text-foreground hover:text-destructive overflow-hidden transition-all duration-200 hover:bg-linear-to-r hover:from-destructive/20 hover:to-transparent relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-0 before:w-1 before:rounded-full before:bg-destructive before:opacity-0 before:transition-all before:duration-100 hover:before:h-full hover:before:opacity-100"
                >
                  <HugeiconsIcon icon={Clock02Icon} size={18} />
                  Lịch sử xem
                </Link>
              </Accordion>
            </div>
          </DrawerContent>
        </Drawer>
        <Link href="/" className="">
          KDPhim
        </Link>
        <Drawer direction="top">
          <DrawerTrigger className="p-4 cursor-pointer">
            <HugeiconsIcon icon={Search} color="#fff" size={20} />
          </DrawerTrigger>
          <DrawerContent className="bg-muted">
            <DrawerHeader className="sr-only">
              <DrawerTitle>Search</DrawerTitle>
              <DrawerDescription>Search films</DrawerDescription>
            </DrawerHeader>

            <div className="relative">
              <form
                action=""
                className="flex items-center border border-background rounded-sm px-1.5 gap-1"
              >
                <HugeiconsIcon icon={Search} color="#fff" size={14} />
                <input
                  type="search"
                  placeholder="Tìm tên phim"
                  name="query"
                  className="flex-1 outline-none py-2"
                />
              </form>
              <div className="max-h-[50vh] overflow-y-auto no-scrollbar space-y-2">
                <div className="flex gap-2">
                  <Link
                    href={`/`}
                    className="w-1/3 aspect-2/3 relative shrink-0"
                  >
                    <Image
                      unoptimized
                      src="/images/examples/img1.png"
                      alt="img1"
                      fill={true}
                      sizes="(max-width: 1200px) 50vw, 100vw"
                      loading="eager"
                      className="rounded-sm"
                    />
                  </Link>
                  <div className="text-foreground ">
                    <Link
                      href={`/`}
                      className="hover:text-destructive transition-colors duration-200"
                    >
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Tempore, quia.
                    </Link>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/`}
                    className="w-1/3 aspect-2/3 relative shrink-0"
                  >
                    <Image
                      unoptimized
                      src="/images/examples/img2.png"
                      alt="img1"
                      fill={true}
                      sizes="(max-width: 1200px) 50vw, 100vw"
                      loading="eager"
                      className="rounded-sm"
                    />
                  </Link>
                  <div className="text-foreground ">
                    <Link
                      href={`/`}
                      className="hover:text-destructive transition-colors duration-200"
                    >
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Tempore, quia.
                    </Link>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/`}
                    className="w-1/3 aspect-2/3 relative shrink-0"
                  >
                    <Image
                      unoptimized
                      src="/images/examples/img3.png"
                      alt="img1"
                      fill={true}
                      sizes="(max-width: 1200px) 50vw, 100vw"
                      loading="eager"
                      className="rounded-sm"
                    />
                  </Link>
                  <div className="text-foreground ">
                    <Link
                      href={`/`}
                      className="hover:text-destructive transition-colors duration-200"
                    >
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Tempore, quia.
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}
