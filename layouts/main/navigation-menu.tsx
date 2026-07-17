"use client";

import { typelistApi } from "@/features/typelist/api";
import { yearsApi } from "@/features/years/api";
import { cn } from "@/lib/utils";
import { ArrowDown, Close, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useState } from "react";

type NavigationMenuProps = {
  categories: T_Category[];
  countries: T_Country[];
};

export default function NavigationMenu({
  categories,
  countries,
}: NavigationMenuProps) {
  const [open, setOpen] = useState(false);
  const [typelistOpen, setTypelistOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [countriesOpen, setCountriesOpen] = useState(false);
  const [yearsOpen, setYearsOpen] = useState(false);

  const onClose = () => setOpen(false);

  const onOpen = () => setOpen(true);

  const currentYear = new Date().getFullYear();

  return (
    <div>
      <button type="button" onClick={onOpen}>
        <HugeiconsIcon icon={Menu01Icon} size={20} />
      </button>

      <div
        onClick={onClose}
        className={cn("fixed inset-0 bg-black/30", open ? "block" : "hidden")}
      ></div>
      <div
        className={cn(
          "fixed inset-y-0 right-0 left-16 sm:left-[40%] bg-black transition duration-200 overflow-y-auto",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <button type="button" onClick={onClose} className="p-4">
          <HugeiconsIcon icon={Close} size={20} />
        </button>

        <ul className="">
          <li>
            <Link href="/" className="flex px-4 py-2">
              Trang chủ
            </Link>
          </li>
          <li>
            <Link href="/" className="flex px-4 py-2">
              Phim hot
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setTypelistOpen((prev) => !prev)}
              className="flex justify-between gap-1 w-full px-4 py-2"
            >
              <span>Loại phim</span>
              <HugeiconsIcon icon={ArrowDown} size={20} />
            </button>

            <div
              className={cn(
                "grid grid-cols-2 gap-4 mx-4 bg-zinc-900 overflow-hidden transition-all duration-300 ease-in-out",
                typelistOpen
                  ? "max-h-20 opacity-100 p-2"
                  : "max-h-0 opacity-0",
              )}
            >
              {typelistApi.items().map((item) => (
                <Link
                  key={item.slug}
                  onClick={onClose}
                  href={`/danh-sach/${item.slug}`}
                  className="text-sm text-center"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setCategoriesOpen((prev) => !prev)}
              className="flex justify-between gap-1 w-full px-4 py-2"
            >
              <span>Thể loại</span>
              <HugeiconsIcon icon={ArrowDown} size={20} />
            </button>

            <div
              className={cn(
                "grid grid-cols-2 gap-4 mx-4 bg-zinc-900 overflow-hidden transition-all duration-300 ease-in-out",
                categoriesOpen
                  ? "max-h-screen opacity-100 p-2"
                  : "max-h-0 opacity-0",
              )}
            >
              {categories.map((item) => (
                <Link
                  key={item.slug}
                  onClick={onClose}
                  href={`/the-loai/${item.slug}`}
                  className="text-sm text-center"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setCountriesOpen((prev) => !prev)}
              className="flex justify-between gap-1 w-full px-4 py-2"
            >
              <span>Quốc gia</span>
              <HugeiconsIcon icon={ArrowDown} size={20} />
            </button>

            <div
              className={cn(
                "grid grid-cols-2 gap-4 mx-4 bg-zinc-900 overflow-hidden transition-all duration-300 ease-in-out",
                countriesOpen
                  ? "max-h-screen opacity-100 p-2"
                  : "max-h-0 opacity-0",
              )}
            >
              {countries.map((item) => (
                <Link
                  key={item.slug}
                  onClick={onClose}
                  href={`/quoc-gia/${item.slug}`}
                  className="text-sm text-center"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setYearsOpen((prev) => !prev)}
              className="flex justify-between gap-1 w-full px-4 py-2"
            >
              <span>Năm</span>
              <HugeiconsIcon icon={ArrowDown} size={20} />
            </button>

            <div
              className={cn(
                "grid grid-cols-4 gap-4 mx-4 bg-zinc-900 overflow-hidden transition-all duration-300 ease-in-out",
                yearsOpen
                  ? "max-h-screen opacity-100 p-2"
                  : "max-h-0 opacity-0",
              )}
            >
              {yearsApi.items().map((_, index) => (
                <Link
                  key={index}
                  onClick={onClose}
                  href={`/nam/${currentYear - index}`}
                  className="text-sm text-center"
                >
                  {currentYear - index}
                </Link>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
