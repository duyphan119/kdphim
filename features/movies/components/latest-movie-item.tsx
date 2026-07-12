import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react"
import { Badge } from "@/components/ui/badge";
import { APP_DOMAIN_CDN_IMAGE } from "@/lib/constants";

type LatestMovieItemProps = {
  movie: T_Movie;
}

export default function LatestMovieItem({
  movie
}: LatestMovieItemProps) {
  return (
    <Link
      href={`/phim/${movie.slug}`}
      title={movie.name}
      className="group flex gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition hover:border-red-600"
    >
      <div className="relative h-36 w-24 shrink-0 overflow-hidden rounded-lg">
        <Image
          src={movie.poster_url.startsWith("https") ? movie.poster_url : `${APP_DOMAIN_CDN_IMAGE}/${movie.poster_url}`}
          alt={movie.name}
          fill
          sizes="96px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white transition group-hover:text-red-500">
            {movie.name}
          </h3>

          <p className="mt-2 text-sm text-zinc-400">
            {movie.country.map(({ name, slug }, index) => <Fragment key={name} >
              {index > 0 ? <span>,&nbsp;</span> : null}
              <span className="country">{name}</span>
            </Fragment>)}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            {movie.category.map(({ name, slug }, index) => <Fragment key={name} >
              {index > 0 ? <span>,&nbsp;</span> : null}
              <span className="category">{name}</span>
            </Fragment>)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge>{movie.episode_current}</Badge>

          <Badge variant="secondary">
            {movie.year}
          </Badge>

          {movie.imdb.vote_average ? <Badge className="bg-yellow-500 text-black hover:bg-yellow-500">
            ⭐ {movie.imdb.vote_average}
          </Badge> : null}

        </div>
      </div>
    </Link>
  );
}