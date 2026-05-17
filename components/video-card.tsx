// components/video-card.tsx

import Image from "next/image";
import Link from "next/link";

type VideoCardProps = {
  videoItem: {
    _id: string;
    slug: string;
    poster_url: string;
    episode_current: string;
    name: string;
  };
  imageDomain: string;
};

export default function VideoCard({ videoItem, imageDomain }: VideoCardProps) {
  return (
    <div className="video-card">
      <Link
        href={`/phim/${videoItem.slug}`}
        className="w-full block aspect-2/3 relative"
      >
        <Image
          unoptimized
          src={`https://phimapi.com/image.php?url=${imageDomain}/${videoItem.poster_url}`}
          alt={videoItem.slug}
          fill
          sizes="(max-width: 1200px) 50vw, 100vw"
          loading="eager"
          className="rounded-sm object-cover"
        />

        <div className="absolute top-0 right-0 text-xs bg-destructive text-destructive-foreground rounded-tr-sm rounded-bl-sm px-1">
          {videoItem.episode_current}
        </div>
      </Link>

      <div>
        <Link
          href={`/phim/${videoItem.slug}`}
          className="font-medium line-clamp-2 hover:text-destructive transition-colors duration-200 mt-1 text-sm"
        >
          {videoItem.name}
        </Link>
      </div>
    </div>
  );
}
