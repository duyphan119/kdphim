"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Trash2 } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import { watchedMoviesApi } from "../api";
import WatchedMovieCard from "../components/watched-movie-card";
import MoviesPagination from "@/features/movies/components/movies-pagination";

type WatchedMoviesPageProps = {
  searchParams: {
    page?: string;
    limit?: string;
  }
}

export default function WatchedMoviesPage({ searchParams }: WatchedMoviesPageProps) {
  const router = useRouter();
  const [data, setData] = useState<{ items: T_WatchedMovie[]; pagination?: T_Pagination }>();

  useEffect(() => {
    (() => {
      const data = watchedMoviesApi.items(searchParams);
      setData(data);
    })()
  }, [searchParams])

  const handleDelete = (item: T_WatchedMovie) => {
    watchedMoviesApi.delete(item.slug);

    router.refresh()
  }

  return (
    <div className="container mx-auto space-y-4 p-4">
      <Breadcrumb
        items={[{ isCurrent: true, name: 'Lịch sử xem', position: 1 }]}
      />
      {(!data || data.items.length === 0) ? <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center">
        <div>
          <h2 className="text-xl font-semibold">
            Chưa có phim nào trong lịch sử xem
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Khám phá những bộ phim hấp dẫn và bắt đầu xem ngay.
          </p>
        </div>

        <div className="flex gap-3">
          <Link href="/phim-hot" className={buttonVariants({})}>
            Khám phá phim hot
          </Link>

          <Link
            href="/"
            className={buttonVariants({ variant: "outline" })}
          >
            Về trang chủ
          </Link>
        </div>
      </div> : <>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data.items.map((videoItem, index) => (
            <div key={videoItem.slug} className="col-span-1">
              <WatchedMovieCard
                movie={videoItem}
              />
              <button onClick={() => handleDelete(videoItem)} className="mt-2 inline-flex px-3 py-2 text-sm items-center gap-1 justify-center bg-zinc-800 text-red-500 rounded-md">
                <HugeiconsIcon icon={Trash2} size={20} />
                Xóa</button>
            </div>
          ))}
        </div>
        {data.pagination ? <div className="">
          <MoviesPagination
            pagination={data.pagination}
            searchParams={searchParams}
          />
        </div> : null}
      </>}

    </div>
  )
}