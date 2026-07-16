import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { getServerName, stripHtml } from "@/lib/utils";
import { moviesApi } from "@/features/movies/api";
import { notFound } from "next/navigation";
import { castsApi } from "@/features/casts/api";
import MovieDetails from "@/features/movies/components/movie-details";

type Params = {
  slug: string;
  ep: string;
  index: string;
};

type Props = {
  params: Promise<Params>;
};

const createEpisodeLink = (
  movieSlug: string,
  serverIndex: number,
  episodeSlug?: string,
) => `/xem-phim/${movieSlug}/${serverIndex}/${episodeSlug}`;


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, ep: episodeSlug, index } = await params;
  const data = await moviesApi.detailsBySlug(slug);

  if (!data || !data.movie) {
    return {
      title: "KDPhim | Không tìm thấy phim",
      description: "Phim không tồn tại hoặc đã bị xoá.",
    };
  }

  const { movie, episodes } = data;

  const serverIndex = Number(index);

  const currentServer = episodes?.[serverIndex];

  const currentEpisode = currentServer?.server_data?.find(
    (ep) => ep.slug === episodeSlug,
  );


  const episodeName =
    currentEpisode?.name || currentEpisode?.filename || "Xem phim";

  const serverName = getServerName(episodes?.[serverIndex]?.server_name);

  const description =
    stripHtml(movie.content).slice(0, 160) ||
    `Xem ${episodeName} của phim ${movie.name} chất lượng cao.`;

  const title = `KDPhim | ${episodeName} - ${serverName} - ${movie.name}`;

  return {
    title,
    description,
  };
}

export default async function Page({ params }: Props) {
  const { slug, ep: episodeSlug, index } = await params;
  const data = await moviesApi.detailsBySlug(slug);

  if (!data || !data.movie) return notFound();

  const { movie, episodes } = data;

  const serverIndex = Number(index);

  const currentServer = episodes?.[serverIndex];

  const currentEpisode = currentServer?.server_data?.find(
    (ep) => ep.slug === episodeSlug,
  );



  const [related, top, casts] = await Promise.allSettled([
    moviesApi.related({ countrySlug: movie.country[0].slug, categorySlug: movie.category.map(({ slug }) => slug), currentSlug: slug }),
    moviesApi.hot({ limit: 24 }),
    castsApi.casts(slug, {
      year: data.movie.year,
      type: data.movie.type,
      keyword: data.movie.name,
      countries: data.movie.country
    })
  ]);

  const relatedMovies = related.status === 'fulfilled' ? related.value : [];
  const hotMovies = (top.status === 'fulfilled' ? top.value?.items : null) || []
  const peoplesData = casts.status === 'fulfilled' ? casts.value : null;


  if (!movie || !currentEpisode) return null;

  const currentEpisodeIndex =
    currentServer?.server_data?.findIndex(
      (ep) => ep.slug === currentEpisode.slug,
    ) ?? -1;

  const prevEpisode =
    currentEpisodeIndex > 0
      ? currentServer?.server_data?.[currentEpisodeIndex - 1]
      : episodes?.[serverIndex - 1]?.server_data?.at(-1);

  const nextEpisode =
    currentEpisodeIndex < (currentServer?.server_data.length ?? 0) - 1
      ? currentServer?.server_data?.[currentEpisodeIndex + 1]
      : episodes?.[serverIndex + 1]?.server_data?.[0];

  const prevLink = prevEpisode
    ? createEpisodeLink(
      movie.slug,
      currentEpisodeIndex > 0 ? serverIndex : serverIndex - 1,
      prevEpisode.slug,
    )
    : undefined;

  const nextLink = nextEpisode
    ? createEpisodeLink(
      movie.slug,
      currentEpisodeIndex < currentServer.server_data.length - 1
        ? serverIndex
        : serverIndex + 1,
      nextEpisode.slug,
    )
    : undefined;

  const serverName = getServerName(episodes?.[serverIndex]?.server_name);

  return (
    <MovieDetails
      movie={movie} hotMovies={hotMovies} relatedMovies={relatedMovies} peoplesData={peoplesData}
      episodes={episodes}
      currentEpisodeSlug={currentEpisode.slug}
      serverIndex={serverIndex}
      currentBreadcrumb={`${currentEpisode.name} - ${serverName}`}
    >
      <div className="aspect-video overflow-hidden rounded-lg bg-slate-950">
        <iframe
          src={currentEpisode.link_embed}
          width="100%"
          height="100%"
          allow="fullscreen"
          className="h-full w-full"
        />
      </div>

      {(prevLink || nextLink) && (
        <div className="mt-4 flex justify-center gap-4">
          {prevLink && (
            <Link
              href={prevLink}
              className={buttonVariants({})}
            >
              <HugeiconsIcon icon={ArrowLeft02Icon} />
              Tập trước
            </Link>
          )}

          {nextLink && (
            <Link
              href={nextLink}
              className={buttonVariants({})}
            >
              Tập sau
              <HugeiconsIcon icon={ArrowRight02Icon} />
            </Link>
          )}
        </div>
      )}
    </MovieDetails>
  );
}
