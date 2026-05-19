"use client";

import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import queryString from "query-string";

type Props = {
  pagination: Pagination;
};

export default function VideosPagination({
  pagination: { currentPage, totalPages },
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const getHref = (page: number) => {
    const params = queryString.parse(window.location.search);

    const queryParams = queryString.stringify({
      ...params,
      page,
    });

    return `${pathname}?${queryParams}`;
  };

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
          <Link href={getHref(totalPages)}>
            <HugeiconsIcon icon={ArrowRight01Icon} />
          </Link>
        </Button>
      )}
    </div>
  );
}
