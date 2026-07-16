"use client";

import { Button } from "@/components/ui/button";
import { yearsApi } from "@/features/years/api";
import { cn } from "@/lib/utils";
import { ArrowDown } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";


export default function YearsMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();

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
        Năm
        <HugeiconsIcon icon={ArrowDown} />
      </Button>

      {open && (
        <div className="absolute left-0 top-full mt-3 w-[600px] max-h-[70vh] overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-2xl">
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {yearsApi.items().map((_, index) => (
              <Link
                key={index}
                href={`/nam/${currentYear - index}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                {currentYear - index}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}