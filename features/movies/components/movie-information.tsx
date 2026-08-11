import { APP_DOMAIN_CDN_IMAGE } from "@/lib/constants";
import { Play } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

type MovieInformationProps = {
  movie: T_Movie;
  firstLink: string;
}

export default function MovieInformation({ movie, firstLink, }: MovieInformationProps) {
  return (
    <div className="overflow-hidden rounded-sm border border-border bg-card shadow-sm block md:grid md:grid-cols-3">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950 md:col-span-1">
        <Image unoptimized
          src={movie.poster_url.startsWith("https") ? movie.poster_url : `${APP_DOMAIN_CDN_IMAGE}/${movie.poster_url}`}
          alt={movie.name}
          fill
          sizes="(max-width: 640px) 50vw,
                 (max-width: 1024px) 33vw,
                 (max-width: 1280px) 20vw,
                 16vw"
          loading="eager"
          placeholder="blur"
          blurDataURL="/images/placeholder-movie.png"
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        {firstLink.startsWith("/xem-phim") ? (
          <div className="absolute bottom-2 inset-x-2">
            <div className="flex items-center gap-2">
              {firstLink ? (
                <Link
                  href={firstLink}
                  title="Xem tập đầu tiên"
                  className="bg-red-500 text-white hover:bg-red-500/80 flex-1 inline-flex items-center justify-center px-3 py-2 rounded-md gap-1.5"
                >
                  <HugeiconsIcon icon={Play} size={20} />
                  Xem ngay
                </Link>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      <div className="space-y-4 p-4 md:col-span-2">
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 text-xs text-muted-foreground">
          <div className="col-span-1 rounded-md bg-zinc-900 px-3 py-2 font-semibold">
            Năm
          </div>
          <div className="col-span-2 lg:col-span-3 rounded-md bg-zinc-900 px-3 py-2">
            {movie.year}
          </div>
          <div className="col-span-1 rounded-md bg-zinc-900 px-3 py-2 font-semibold">
            Đạo diễn
          </div>
          <div className="col-span-2 lg:col-span-3 rounded-md bg-zinc-900 px-3 py-2">
            {movie.director.join(", ") || "Đang cập nhật"}
          </div>
          <div className="col-span-1 rounded-md bg-zinc-900 px-3 py-2 font-semibold">
            Quốc gia
          </div>
          <div className="col-span-2 lg:col-span-3 rounded-md bg-zinc-900 px-3 py-2">
            {movie.country?.map((item, index) => (
              <Fragment key={item.slug}>
                {index !== 0 ? <span>,&nbsp;</span> : null}
                <Link
                  href={`/quoc-gia/${item.slug}`}
                  title={item.name}
                  className="hover:underline transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </Fragment>
            )) || "Đang cập nhật"}
          </div>
          <div className="col-span-1 rounded-md bg-zinc-900 px-3 py-2 font-semibold">
            Thể loại
          </div>
          <div className="col-span-2 lg:col-span-3 rounded-md bg-zinc-900 px-3 py-2">
            {movie.category.map((item, index) => (
              <Fragment key={item.slug}>
                {index !== 0 ? <span>,&nbsp;</span> : null}
                <Link
                  href={`/the-loai/${item.slug}`}
                  title={item.name}
                  className="hover:underline transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </Fragment>
            ))}
          </div>
          <div className="col-span-1 rounded-md bg-zinc-900 px-3 py-2 font-semibold">
            Ngôn ngữ
          </div>
          <div className="col-span-2 lg:col-span-3 rounded-md bg-zinc-900 px-3 py-2">
            {movie.lang}
          </div>
          <div className="col-span-1 rounded-md bg-zinc-900 px-3 py-2 font-semibold">
            Trạng thái
          </div>
          <div className="col-span-2 lg:col-span-3 rounded-md bg-zinc-900 px-3 py-2">
            {movie.status === "completed"
              ? "Hoàn thành"
              : `Đang chiếu ${movie.episode_current.toLowerCase()}`}
          </div>
          <div className="col-span-1 rounded-md bg-zinc-900 px-3 py-2 font-semibold">
            Tổng số tập
          </div>
          <div className="col-span-2 lg:col-span-3 rounded-md bg-zinc-900 px-3 py-2">
            {movie.episode_total}
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: movie.content || "Chưa có mô tả cho phim này.",
          }}
          className="mt-4 leading-7 text-muted-foreground text-sm text-justify bg-zinc-900 rounded-md px-3 py-2"
        ></div>
      </div></div>
  );
}