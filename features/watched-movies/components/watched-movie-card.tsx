import Image from "next/image";
import Link from "next/link";

import { PlayCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";
import { APP_DOMAIN_CDN_IMAGE } from "@/lib/constants";

type MovieCardProps = {
  movie: T_WatchedMovie;
  imageType?: "thumb" | "poster";
  className?: string;
}

export default function WatchedMovieCard({
  movie,
  imageType = 'poster',
  className
}: MovieCardProps) {
  if (!movie) return null;

  const imageSrc = imageType === 'poster' ? movie.poster_url : movie.thumb_url
  return (
    <Link
      href={`/xem-phim/${movie.slug}/${movie.server_index}/${movie.episode_slug}`}
      title={movie.name}
      className={cn("group overflow-hidden rounded-md block space-y-3", className)}
    >
      <div className={cn("relative overflow-hidden rounded-md", imageType === 'poster' ? 'aspect-[2/3]' : 'aspect-video')}>
        <Image unoptimized
          src={imageSrc.startsWith("https") ? imageSrc : `${APP_DOMAIN_CDN_IMAGE}/${imageSrc}`}
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

        <div className="absolute top-0 left-0">
          <p className="px-2 py-1 text-xs bg-red-500/90 rounded-ee-md">{movie.episode_name}</p>
        </div>
      </div>

      <h3 className="line-clamp-2 text-sm font-semibold text-white transition group-hover:text-red-500">
        {movie.name}
      </h3>
    </Link>
  );
}