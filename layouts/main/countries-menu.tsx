"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


type CountriesMenuProps = {
  countries: T_Country[];
}

export default function CountriesMenu({
  countries,
}: CountriesMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <Button
        variant="ghost"
        onClick={() => setOpen((prev) => !prev)}
        className={cn("font-medium transition hover:text-red-500", open ? "text-red-500" : "text-foreground")}
      >
        Quốc gia
        <HugeiconsIcon icon={ArrowDown} />
      </Button>

      {open && (
        <div className="absolute left-0 top-full mt-3 w-[600px] max-h-[70vh] overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-2xl">
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {countries.map((country) => (
              <Link
                key={country.slug}
                href={`/the-loai/${country.slug}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                {country.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}