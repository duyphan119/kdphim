import Image from "next/image";
import Link from "next/link";

import { PlayCircleIcon, FavouriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APP_DOMAIN_CDN_IMAGE } from "@/lib/constants";

type HeroBannerProps = {
  movie: T_Movie;
  episodes: T_Episode[];
}

export default function HeroBanner({ movie, episodes }: HeroBannerProps) {
  const src = movie.thumb_url.startsWith("https") ? movie.thumb_url : `${APP_DOMAIN_CDN_IMAGE}/${movie.thumb_url}`;

  const watchNowLink = `/xem-phim/${movie.slug}/0/${episodes?.[0].server_data?.[0].slug}`
  return (
    <section className="relative md:mt-0 mt-20 h-[30vh] sm:h-[50vh] md:h-[70vh] lg:h-screen w-screen overflow-hidden">
      <Image
        src={src}
        alt="Hero Banner"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

      <div className="container relative z-10 mx-auto flex h-full items-center px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-black leading-tight text-white lg:text-7xl">
            {movie.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs md:text-sm text-zinc-300">
            <Link href={`/nam/${movie.year}`}>{movie.year}</Link>
            {movie.country.map(({ name, slug }) => <Link key={name} href={`/quoc-gia/${slug}`}>{name}</Link>)}
            {movie.category.map(({ name, slug }) => <Link key={name} href={`/the-loai/${slug}`}>{name}</Link>)}
          </div>

          <div dangerouslySetInnerHTML={{ __html: movie.content }} className="mt-5 max-w-xl leading-8 text-zinc-300 line-clamp-3 hidden md:block">
          </div>

          <div className="mt-8 flex gap-4">
            <Link href={watchNowLink} className="bg-red-500 text-xs md:text-sm hover:bg-red-500/90 inline-flex items-center gap-1 px-3 py-2 rounded-md">
              <HugeiconsIcon
                icon={PlayCircleIcon}
                className="size-4 md:size-5"
              />
              Watch Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}