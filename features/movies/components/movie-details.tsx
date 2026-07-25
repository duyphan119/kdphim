"use client";

import Breadcrumb from "@/components/breadcrumb";
import { CastsResponse } from "@/features/casts/api";
import MovieCasts from "@/features/casts/components/movie-casts";
import { watchedMoviesApi } from "@/features/watched-movies/api";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import MovieCard from "./movie-card";
import MovieEpisodes from "./movie-episodes";
import MovieInformation from "./movie-information";
import RelatedMovies from "./related-movies";
import MovieBreadcrumb from "./movie-breadcrumb";

type Props = {
  movie: T_Movie;
  episodes: T_Episode[];
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
  children,
  episodes,
  currentEpisodeSlug,
  serverIndex,
  currentBreadcrumb, relatedMovies, hotMovies, peoplesData
}: Props) {
  const videoSlug = movie.slug;

  let firstLink: string = `/phim/${videoSlug}`;

  if (episodes?.length && !children) {
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
          <MovieBreadcrumb movie={movie} hasChildren={children ? true : false} currentBreadcrumb={currentBreadcrumb} />
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
            <article className={children ? "order-4" : "order-2"}  >
              <MovieInformation movie={movie} firstLink={firstLink} />
            </article>
            <div className={cn("space-y-4", children ? "order-5" : "order-3")}>
              <MovieCasts
                actors={movie.actor}
                peoplesData={peoplesData}
              />
            </div>
            {episodes?.length && currentEpisodeSlug && typeof serverIndex === 'number' ? (
              <div
                className={cn(
                  "rounded-sm border border-border bg-card p-6 shadow-sm",
                  children ? "order-2" : "order-4",
                )}
              >
                <MovieEpisodes
                  currentEpisodeSlug={currentEpisodeSlug}
                  episodes={episodes}
                  movieSlug={movie.slug}
                  serverIndex={serverIndex}
                />
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
              <div key={item.slug} className="col-span-1">
                <MovieCard movie={item} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
