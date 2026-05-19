"use client";

import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import queryString from "query-string";
import { useEffect, useRef, useState } from "react";

type Props = {
  pagination: Pagination;
  searchParams?: Record<string, string>;
};

export default function VideosPagination({
  pagination: { currentPage, totalPages },
  searchParams,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const formRef = useRef<HTMLFormElement | null>(null);

  const getHref = (page: number) => {
    const queryParams = queryString.stringify({
      ...searchParams,
      page,
    });
    return `${pathname}?${queryParams}`;
  };

  useEffect(() => {
    formRef.current?.reset();
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center gap-2">
      {currentPage === 1 ? null : (
        <Button size="icon">
          <Link href={getHref(1)}>
            <HugeiconsIcon icon={ArrowLeft01Icon} />
          </Link>
        </Button>
      )}
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          const newPage = document.getElementById("page") as HTMLInputElement;
          router.push(getHref(Number(newPage.value)));
        }}
      >
        <input
          type="number"
          min={1}
          max={totalPages}
          id="page"
          placeholder={currentPage.toString()}
          className="border border-foreground rounded-md h-9 w-12 text-right px-1"
        />
      </form>
      <div className="">/{totalPages}</div>
      {currentPage === totalPages ? null : (
        <Button size="icon">
          <Link href={getHref(currentPage + 1)}>
            <HugeiconsIcon icon={ArrowRight01Icon} />
          </Link>
        </Button>
      )}
    </div>
  );
}
