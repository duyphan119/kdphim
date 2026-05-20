// components/video-card.tsx

import Image from "next/image";
import Link from "next/link";

type VideoCardProps = {
  videoItem: {
    name: string;
    slug: string;
    poster_url: string;
    episode_current?: string;
    lang?: string;
  };
  imageDomain?: string;
};

export default function VideoCard({ videoItem, imageDomain }: VideoCardProps) {
  return (
    <div className="video-card">
      <Link
        href={`/phim/${videoItem.slug}`}
        title={videoItem.name}
        className="w-full block aspect-2/3 relative"
      >
        <Image
          unoptimized
          src={`https://phimapi.com/image.php?url=${imageDomain ? imageDomain + "/" : ""}${videoItem.poster_url}`}
          alt={videoItem.slug}
          fill
          sizes="(max-width: 1200px) 50vw, 100vw"
          loading="eager"
          className="rounded-sm object-cover"
        />

        {videoItem.episode_current ? (
          <div className="absolute top-0 right-0 text-xs bg-destructive text-destructive-foreground rounded-tr-sm rounded-bl-sm px-1">
            {videoItem.episode_current}
          </div>
        ) : null}
        {videoItem.lang ? (
          <div className="absolute bottom-0 left-0 text-xs bg-sky-700 text-destructive-foreground rounded-tr-sm rounded-bl-sm px-1">
            {videoItem.lang
              .replace("Thuyết Minh", "TM")
              .replace("Lồng Tiếng", "LT")}
          </div>
        ) : null}
      </Link>

      <div>
        <Link
          href={`/phim/${videoItem.slug}`}
          title={videoItem.name}
          className="font-medium line-clamp-2 hover:text-destructive transition-colors duration-200 mt-1 text-sm"
        >
          {videoItem.name}
        </Link>
      </div>
    </div>
  );
}
