"use client";

import { getVideoDetails } from "@/lib/video/data";
import { useQuery } from "@tanstack/react-query";
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
import VideoPlayer from "@/components/ui/video-player";
import { Button } from "@/components/ui/button";

type Props = {};

export default function VideoStreaming({}: Props) {
  const params = useParams();
  const movieSlug = params?.slug as string | undefined;
  const serverIndex = parseInt((params?.index as string) || "0", 10);
  const episodeSlug = params?.ep as string | undefined;

  const { data, isLoading, error } = useQuery({
    queryKey: ["video", movieSlug],
    queryFn: () => getVideoDetails(movieSlug ?? ""),
    enabled: Boolean(movieSlug),
  });

  const movie = data?.movie;
  const episodes = data?.episodes;
  const currentServer = episodes?.[serverIndex];
  const currentEpisode = currentServer?.server_data?.find(
    (ep) => ep.slug === episodeSlug,
  );

  if (!movieSlug) {
    return (
      <div className="px-4 py-8 text-sm text-muted-foreground">
        Không tìm thấy phim.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="px-4 py-8 text-sm text-muted-foreground">
        Đang tải phim...
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="px-4 py-8 text-sm text-destructive">
        Không thể tải phim. Vui lòng thử lại sau.
      </div>
    );
  }

  const movieTypeSlug = movie.type === "series" ? "phim-bo" : "phim-le";

  // Calculate previous and next episode links
  const currentEpisodeIndex =
    currentServer?.server_data?.findIndex((ep) => ep.slug === episodeSlug) ??
    -1;

  let prevLink: string | undefined;
  let nextLink: string | undefined;

  // Previous episode
  if (currentEpisodeIndex > 0) {
    const prevEpisode = currentServer?.server_data?.[currentEpisodeIndex - 1];
    if (prevEpisode) {
      prevLink = `/xem-phim/${movieSlug}/${serverIndex}/${prevEpisode.slug}`;
    }
  } else if (serverIndex > 0 && episodes) {
    // Previous server's last episode
    const prevServer = episodes[serverIndex - 1];
    const lastEpisodeInPrevServer =
      prevServer.server_data[prevServer.server_data.length - 1];
    if (lastEpisodeInPrevServer) {
      prevLink = `/xem-phim/${movieSlug}/${serverIndex - 1}/${lastEpisodeInPrevServer.slug}`;
    }
  }

  // Next episode
  if (currentEpisodeIndex >= 0 && currentServer?.server_data) {
    if (currentEpisodeIndex < currentServer.server_data.length - 1) {
      const nextEpisode = currentServer.server_data[currentEpisodeIndex + 1];
      if (nextEpisode) {
        nextLink = `/xem-phim/${movieSlug}/${serverIndex}/${nextEpisode.slug}`;
      }
    } else if (serverIndex < (episodes?.length ?? 0) - 1 && episodes) {
      // Next server's first episode
      const nextServer = episodes[serverIndex + 1];
      if (nextServer.server_data.length > 0) {
        nextLink = `/xem-phim/${movieSlug}/${serverIndex + 1}/${nextServer.server_data[0].slug}`;
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
              <BreadcrumbLink asChild>
                <Link href={`/phim/${movie.slug}`}>{movie.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {currentServer?.server_name} - {currentEpisode?.name || "Tập"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold leading-tight">{movie.name}</h1>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <p>{movie.origin_name}</p>
            <p>
              {currentServer?.server_name} • {currentEpisode?.name || "Tập"}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden bg-slate-950">
        <VideoPlayer
          embed={currentEpisode?.link_embed}
          src={currentEpisode?.link_m3u8}
          title={`${movie.name} - ${currentEpisode?.name || "Tập"}`}
        />
      </div>

      <div className="flex gap-2 justify-center">
        <Button asChild disabled={!prevLink} variant="outline" size="lg">
          <Link href={prevLink ?? "#"}>← Tập trước</Link>
        </Button>
        <Button asChild disabled={!nextLink} size="lg">
          <Link href={nextLink ?? "#"}>Tập sau →</Link>
        </Button>
      </div>

      {episodes && episodes.length > 0 ? (
        <div className="space-y-6">
          {episodes.map((server, index) => (
            <div key={server.server_name} className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{server.server_name}</h3>
                <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">
                  {server.server_data.length} tập
                </span>
                {index === serverIndex && (
                  <span className="text-xs bg-destructive text-destructive-foreground px-3 py-1 rounded-full">
                    Đang xem
                  </span>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
                {server.server_data.map((episode) => {
                  const isCurrentEpisode =
                    index === serverIndex && episode.slug === episodeSlug;
                  return (
                    <Button
                      key={episode.slug || episode.filename}
                      asChild
                      variant={isCurrentEpisode ? "default" : "outline"}
                      size="sm"
                      className={isCurrentEpisode ? "font-semibold" : ""}
                    >
                      <Link
                        href={`/xem-phim/${movieSlug}/${index}/${episode.slug}`}
                        title={episode.name}
                      >
                        {episode.name}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
