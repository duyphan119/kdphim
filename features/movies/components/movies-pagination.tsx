"use client";

import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import queryString from "query-string";
import { useEffect, useRef } from "react";

type Props = {
  pagination: T_Pagination;
  searchParams?: Record<string, string>;
};

export default function MoviesPagination({
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

  if (totalPages === 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      {currentPage === 1 ? null : (
        <Link href={getHref(1)} className="inline-flex items-center justify-center gap-2 text-sm px-3 h-8 rounded-md bg-red-500 text-white">
          <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
          Trang trước
        </Link>
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
          className="border border-foreground rounded-md h-7 w-12 text-sm text-right px-1"
        />
      </form>
      <div className="text-sm">/{totalPages}</div>
      {currentPage === totalPages ? null : (
        <Link href={getHref(currentPage + 1)} className="inline-flex items-center justify-center gap-2 text-sm px-3 h-8 rounded-md bg-red-500 text-white">
          Trang tiếp theo
          <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
        </Link>
      )}
    </div>
  );
}
