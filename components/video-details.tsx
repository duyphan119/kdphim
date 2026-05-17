"use client";

import { getVideoDetails } from "@/lib/video/data";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type Props = {};

export default function VideoDetails({}: Props) {
  const params = useParams();
  const slug = params?.slug as string | undefined;

  const { data, isLoading, error } = useQuery({
    queryKey: ["video", slug],
    queryFn: () => getVideoDetails(slug ?? ""),
    enabled: Boolean(slug),
  });

  const movie = data?.movie;
  const episodes = data?.episodes;

  const posterSrc = movie?.poster_url
    ? movie.poster_url.startsWith(process.env.NEXT_PUBLIC_API_URL || "")
      ? movie.poster_url
      : `https://phimapi.com/image.php?url=${movie.poster_url}`
    : undefined;

  if (!slug) {
    return (
      <div className="px-4 py-8 text-sm text-muted-foreground">
        Không tìm thấy phim.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="px-4 py-8 text-sm text-muted-foreground">
        Đang tải chi tiết phim...
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="px-4 py-8 text-sm text-destructive">
        Không thể tải chi tiết phim. Vui lòng thử lại sau.
      </div>
    );
  }

  const movieTypeSlug = movie.type === "series" ? "phim-bo" : "phim-le";

  // Build quick links to first and last episode available
  let firstLink: string | undefined;
  let lastLink: string | undefined;

  if (episodes?.length) {
    // find first available
    for (let i = 0; i < episodes.length; i++) {
      const sd = episodes[i].server_data;
      if (sd && sd.length) {
        const ep = sd[0];
        firstLink = `/xem-phim/${movie.slug}/${i}/${ep.slug || ep.filename}`;
        break;
      }
    }

    // find last available
    for (let i = episodes.length - 1; i >= 0; i--) {
      const sd = episodes[i].server_data;
      if (sd && sd.length) {
        const ep = sd[sd.length - 1];
        lastLink = `/xem-phim/${movie.slug}/${i}/${ep.slug || ep.filename}`;
        break;
      }
    }
  }

  return (
    <section className="px-4 py-6 space-y-6">
      <div className="space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Trang chủ</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/danh-sach/${movieTypeSlug}`}>
                  {movieTypeSlug === "phim-bo" ? "Phim bộ" : "Phim lẻ"}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/danh-sach/${movieTypeSlug}/${movie.year}`}>
                  {movie.year}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {movie.country[0] ? (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={`/danh-sach/${movieTypeSlug}/${movie.year}/${movie.country[0]?.slug}`}
                    >
                      {movie.country[0].name}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            ) : null}
            {movie.category[0] ? (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={`/danh-sach/${movieTypeSlug}/${movie.year}${movie.country[0] ? `/${movie.country[0].slug}` : ""}/${movie.category[0]?.slug}`}
                    >
                      {movie.category[0].name}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            ) : null}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{movie.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold leading-tight">
              {movie.name}
            </h1>
            <p className="text-sm text-muted-foreground">{movie.origin_name}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <article className="overflow-hidden rounded-sm border border-border bg-card shadow-sm">
          {posterSrc ? (
            <div className="relative aspect-2/3 w-full overflow-hidden bg-slate-950">
              <Image
                unoptimized
                src={posterSrc}
                alt={movie.name}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover"
                loading="eager"
              />
            </div>
          ) : (
            <div className="aspect-2/3 bg-slate-950" />
          )}
          <div className="space-y-4 p-5">
            <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground sm:grid-cols-4">
              <div className="rounded-2xl bg-muted px-3 py-2">Năm</div>
              <div className="col-span-2 rounded-2xl bg-muted px-3 py-2">
                {movie.year}
              </div>
              <div className="rounded-2xl bg-muted px-3 py-2">Thời lượng</div>
              <div className="col-span-2 rounded-2xl bg-muted px-3 py-2">
                {movie.time}
              </div>
              <div className="rounded-2xl bg-muted px-3 py-2">Chất lượng</div>
              <div className="col-span-2 rounded-2xl bg-muted px-3 py-2">
                {movie.quality}
              </div>
              <div className="rounded-2xl bg-muted px-3 py-2">Ngôn ngữ</div>
              <div className="col-span-2 rounded-2xl bg-muted px-3 py-2">
                {movie.lang}
              </div>
              <div className="rounded-2xl bg-muted px-3 py-2">Trạng thái</div>
              <div className="col-span-2 rounded-2xl bg-muted px-3 py-2">
                {movie.status === "completed"
                  ? "Hoàn thành"
                  : `Đang chiếu ${movie.episode_current.toLowerCase()}`}
              </div>
              <div className="rounded-2xl bg-muted px-3 py-2">Tổng số tập</div>
              <div className="col-span-2 rounded-2xl bg-muted px-3 py-2">
                {movie.episode_total}
              </div>
            </div>
          </div>
        </article>

        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-5 flex flex-wrap gap-2">
              {movie.category.map((item) => (
                <Badge key={item.id} variant="destructive">
                  <Link href={`/the-loai/${item.slug}`}>{item.name}</Link>
                </Badge>
              ))}
              {movie.country.map((item) => (
                <span
                  key={item.id}
                  className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary"
                >
                  {item.name}
                </span>
              ))}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-muted p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Quốc gia
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground space-x-2">
                  {movie.country?.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/quoc-gia/${item.slug}`}
                      className="hover:underline transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  )) || "Đang cập nhật"}
                </p>
              </div>
              <div className="rounded-3xl bg-muted p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Đạo diễn
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  {movie.director.length
                    ? movie.director.join(", ")
                    : "Đang cập nhật"}
                </p>
              </div>
              <div className="rounded-3xl bg-muted p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Diễn viên
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground">
                  {movie.actor.length ? movie.actor.join(", ") : "Chưa có"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Nội dung phim</h2>
            <p className="mt-4 whitespace-pre-line leading-7 text-muted-foreground">
              {movie.content || "Chưa có mô tả cho phim này."}
            </p>
          </div>

          {episodes?.length ? (
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">Danh sách tập</h2>
                  <p className="text-sm text-muted-foreground">
                    {episodes.length} server khả dụng
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {episodes.map((server, index) => (
                  <div
                    key={server.server_name}
                    className="rounded-3xl border border-border bg-muted p-4"
                  >
                    <h3 className="text-sm font-semibold">
                      {server.server_name}
                    </h3>
                    <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-2">
                      {server.server_data.slice(0, 6).map((item) => (
                        <Link
                          key={item.slug || item.filename}
                          href={`/xem-phim/${movie.slug}/${index}/${item.slug}`}
                          className="col-span-1 rounded-2xl bg-background px-3 py-2 text-sm text-white text-center"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
