"use client";

import Breadcrumb from "@/components/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { CastsResponse } from "@/features/casts/api";
import { APP_DOMAIN_CDN_IMAGE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Play } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import MovieCard from "./movie-card";
import RelatedMovies from "./related-movies";
import { watchedMoviesApi } from "@/features/watched-movies/api";

type Props = {
  movie: T_Movie;
  episodes: T_Episode[];
  hideButtons?: boolean;
  children?: React.ReactNode;
  currentEpisodeSlug?: string;
  serverIndex?: number;
  currentBreadcrumb?: string;
  relatedMovies: T_Movie[];
  hotMovies: T_Movie[];
  peoplesData: CastsResponse | null;
};

export default function MovieDetails({
  movie,
  hideButtons,
  children,
  episodes,
  currentEpisodeSlug,
  serverIndex,
  currentBreadcrumb, relatedMovies, hotMovies, peoplesData
}: Props) {
  const videoTypeSlug = movie.type === "series" ? "phim-bo" : "phim-le";
  const videoTypeName = movie.type === "series" ? "Phim bộ" : "Phim lẻ";
  const videoSlug = movie.slug;

  let firstLink: string = `/phim/${videoSlug}`;

  if (episodes?.length) {
    // find first available
    for (let i = 0; i < episodes.length; i++) {
      const sd = episodes[i].server_data;
      if (sd && sd.length) {
        const ep = sd[0];
        firstLink = `/xem-phim/${videoSlug}/${i}/${ep.slug || ep.filename}`;
        break;
      }
    }
  }

  useEffect(() => {
    if (episodes.length === 0 || !(typeof serverIndex === 'number' && !isNaN(serverIndex)) || !currentEpisodeSlug) {
      return;
    }
    const timeoutId = setTimeout(() => {
      watchedMoviesApi.create({
        name: movie.name,
        slug: movie.slug,
        poster_url: movie.poster_url,
        thumb_url: movie.thumb_url,
        server_index: serverIndex,
        episode_slug: currentEpisodeSlug,
        episode_name: episodes[serverIndex].server_data.find((item) => item.slug === currentEpisodeSlug)?.name || ''
      })
    }, 4567)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [movie, episodes, serverIndex, currentEpisodeSlug])


  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4">
          <Breadcrumb
            items={[
              {
                slug: `/danh-sach/${videoTypeSlug}`,
                isCurrent: false,
                name: videoTypeName,
                position: 1,
              },
              {
                slug: `/nam/${videoTypeSlug}?year=${movie.year}`,
                isCurrent: false,
                name: movie.year + "",
                position: 2,
              },
              {
                slug: `/nam/${videoTypeSlug}?year=${movie.year}&country=${movie.country[0].slug}`,
                isCurrent: false,
                name: movie.country[0].name,
                position: 3,
              },
              {
                slug: `/nam/${videoTypeSlug}?year=${movie.year}&country=${movie.country[0].slug}&category=${movie.category[0].slug}`,
                isCurrent: false,
                name: movie.category[0].name,
                position: 4,
              },
              {
                isCurrent: children ? false : true,
                name: movie.name,
                position: 5,
                slug: children ? `/phim/${movie.slug}` : undefined,
              },
              ...(children && currentBreadcrumb
                ? [
                  {
                    isCurrent: true,
                    name: currentBreadcrumb,
                    position: 6,
                  },
                ]
                : []),
            ]}
          />
        </div>
        <div className="col-span-4 md:col-span-3 space-y-4">
          <div className="flex flex-col gap-4">
            <div
              className={cn(
                "flex flex-col gap-3 md:flex-row md:items-start md:justify-between",
                children ? "order-3" : "order-1",
              )}
            >
              <div>
                <h1 className="text-3xl font-semibold leading-tight">
                  {movie.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {movie.origin_name}
                </p>
              </div>
            </div>

            {children ? <div className="order-1">{children}</div> : null}
            <article
              className={cn(
                "overflow-hidden rounded-sm border border-border bg-card shadow-sm block md:grid md:grid-cols-3",
                children ? "order-4" : "order-2",
              )}
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950 md:col-span-1">
                <Image
                  src={movie.poster_url.startsWith("https") ? movie.poster_url : `${APP_DOMAIN_CDN_IMAGE}/${movie.poster_url}`}
                  alt={movie.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover"
                  crossOrigin="anonymous"
                />

                {hideButtons ? null : (
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
                )}
              </div>

              <div className="space-y-4 p-4 md:col-span-2">
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Năm
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
                    {movie.year}
                  </div>
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Đạo diễn
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
                    {movie.director.join(", ") || "Đang cập nhật"}
                  </div>
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Quốc gia
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
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
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Thể loại
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
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
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Ngôn ngữ
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
                    {movie.lang}
                  </div>
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Trạng thái
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
                    {movie.status === "completed"
                      ? "Hoàn thành"
                      : `Đang chiếu ${movie.episode_current.toLowerCase()}`}
                  </div>
                  <div className="col-span-1 rounded-md bg-muted px-3 py-2 font-semibold">
                    Tổng số tập
                  </div>
                  <div className="col-span-2 rounded-md bg-muted px-3 py-2">
                    {movie.episode_total}
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: movie.content || "Chưa có mô tả cho phim này.",
                  }}
                  className="mt-4 leading-7 text-muted-foreground text-sm text-justify bg-muted rounded-md px-3 py-2"
                ></div>
              </div>
            </article>
            <div className={cn("space-y-4", children ? "order-5" : "order-3")}>
              <div className="rounded-sm border border-border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-semibold">Diễn viên</h2>
                {peoplesData && peoplesData.peoples.length > 0 ? <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4 mt-4">
                  {peoplesData.peoples.map((item, index) => (
                    <div key={index} className="border border-muted">
                      <Link
                        href={`/dien-vien/${item.tmdb_people_id || item.id}`}
                        title={item.name}
                        className="relative aspect-[2/3] block"
                      >
                        <Image
                          unoptimized
                          src={
                            item.profile_path
                              ? `${peoplesData?.profile_sizes.h632}${item.profile_path}`
                              : item.gender === 1
                                ? "/images/placeholder-cast-female.png"
                                : "/images/placeholder-cast-male.png"
                          }
                          alt="Profile"
                          fill
                          className="rounded-ss-md rounded-se-md object-cover"
                        />
                      </Link>
                      <div className="p-1 flex flex-col items-center">
                        <Link
                          href={`/dien-vien/${item.tmdb_people_id}`}
                          title={item.name}
                          className="text-sm hover:text-destructive transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                        <div className="text-muted-foreground text-xs text-center">
                          {item.character}
                        </div>
                      </div>
                    </div>
                  ))}
                </div> : <p className="mt-4">{movie.actor.join(", ")}</p>}
              </div>

            </div>
            {episodes?.length ? (
              <div
                className={cn(
                  "rounded-sm border border-border bg-card p-6 shadow-sm",
                  children ? "order-2" : "order-4",
                )}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold">Danh sách tập</h2>
                    <p className="text-sm text-muted-foreground">
                      {episodes.length} server khả dụng
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {episodes.map((server, index) => {
                    const serverIsActive = index === serverIndex;
                    return (
                      <div
                        key={server.server_name}
                        className="rounded-sm border border-border bg-muted p-4"
                      >
                        <h3 className="text-sm font-semibold">
                          {server.server_name}
                          {serverIsActive && (
                            <Badge
                              variant={"destructive"}
                              className="ml-2 -translate-y-px"
                            >
                              Đang xem
                            </Badge>
                          )}
                        </h3>

                        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                          {server.server_data.map((item) => {
                            const episodeIsActive =
                              serverIsActive &&
                              item.slug === currentEpisodeSlug;
                            return (
                              <Link
                                key={item.slug || item.filename}
                                title={item.name}
                                href={`/xem-phim/${videoSlug}/${index}/${item.slug}`}
                                className={buttonVariants({
                                  variant: episodeIsActive
                                    ? "sky"
                                    : "background",
                                  className:
                                    "col-span-1 rounded-sm text-center",
                                })}
                              >
                                {item.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
          <RelatedMovies movies={relatedMovies} />
        </div>
        <div className="col-span-4 md:col-span-1">
          <div className="space-y-4 py-4 hidden md:block">
            {hotMovies.map((item) => (
              <div key={item.slug} className="">
                <MovieCard movie={item} direction="row" />
              </div>
            ))}
          </div>
          <div className="py-4 grid grid-cols-2 gap-4 md:hidden">
            {hotMovies.map((item) => (
              <div key={item.slug} className="">
                <MovieCard movie={item} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
