"use client";

import { Pagination } from "@/lib/video/types";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

type Props = {
  pagination: Pagination;
};

export default function VideosPagination({ pagination }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center justify-center gap-2">
      <Button size="icon">
        <Link href={`${pathname}`}>
          <HugeiconsIcon icon={ArrowLeft01Icon} />
        </Link>
      </Button>
      <form
        id="form-rhf-demo"
        onSubmit={(e) => {
          e.preventDefault();
          const params = new URLSearchParams(window.location.search);

          const obj = Object.fromEntries(params.entries());

          const newPage = document.getElementById("page") as HTMLInputElement;
          let pageValue = 1;
          const totalPages = pagination.totalPages || 1;
          if (newPage.value === "" || +newPage.value < 1) pageValue = 1;
          else if (+newPage.value > totalPages) pageValue = totalPages;
          else pageValue = +newPage.value;
          const queryParams = new URLSearchParams({
            ...obj,
            page: pageValue.toString(),
          }).toString();

          router.push(`${pathname}${queryParams ? `?${queryParams}` : ""}`);
          router.refresh();
        }}
      >
        <input
          type="number"
          min={1}
          max={pagination.totalPages}
          id="page"
          placeholder={pagination.currentPage.toString()}
          className="border border-foreground rounded-md h-9 w-12 text-right px-1"
        />
      </form>
      <div className="">/{pagination.totalPages}</div>
      <Button size="icon">
        <Link href={`${pathname}`}>
          <HugeiconsIcon icon={ArrowRight01Icon} />
        </Link>
      </Button>
    </div>
  );
}
