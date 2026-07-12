import Image from "next/image";
import Link from "next/link";

import { PlayCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";
import { APP_DOMAIN_CDN_IMAGE } from "@/lib/constants";

type MovieCardProps = {
  movie: T_Movie;
  direction?: "col" | "row";
  className?: string;
}

export default function MovieCard({
  movie,
  direction = 'col',
  className
}: MovieCardProps) {
  if (!movie) return null;
  return (
    <Link
      href={`/phim/${movie.slug}`}
      title={movie.name}
      className={cn("group overflow-hidden rounded-xl", direction === "col" ? "block space-y-3" : "flex gap-3", className)}
    >
      <div className={cn("relative aspect-[498/747] overflow-hidden rounded-xl", direction === 'col' ? 'w-full' : 'w-1/2 flex-shrink-0')}>
        <Image
          src={movie.poster_url.startsWith("https") ? movie.poster_url : `${APP_DOMAIN_CDN_IMAGE}/${movie.poster_url}`}
          alt={movie.name}
          fill
          sizes="(max-width: 640px) 50vw,
         (max-width: 1024px) 33vw,
         (max-width: 1280px) 20vw,
         16vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
          <div className="rounded-full bg-red-600 p-4">
            <HugeiconsIcon
              icon={PlayCircleIcon}
              size={34}
              color="white"
            />
          </div>
        </div>
      </div>

      <h3 className="line-clamp-2 font-semibold text-white transition group-hover:text-red-500">
        {movie.name}
      </h3>
    </Link>
  );
}