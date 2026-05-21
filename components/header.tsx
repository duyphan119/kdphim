"use client";

import { Search } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Suspense } from "react";
import HeaderMenu from "./header-menu";
import HeaderSearch from "./header-search";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="bg-background fixed top-0 inset-x-0 z-10 _container">
      <div className="flex justify-between items-center gap-2 h-16">
        <HeaderMenu />
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
