import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface TopDonghuaCardProps {
  rank: number;
  image: string;
  title: string;
  href: string;
  className?: string;
}

export default function TopDonghuaCard({
  rank,
  image,
  title,
  href, className
}: TopDonghuaCardProps) {
  return (
    <Link
      href={href} title={title}
      className={cn("group relative flex h-[360px] items-end", className)}
    >
      {/* Rank */}
      <span className="absolute -left-2 bottom-0 text-[180px] font-black leading-none text-zinc-800 transition duration-300 group-hover:text-red-600">
        {rank}
      </span>

      {/* Poster */}
      <div className="relative ml-16 w-full aspect-[498/747] overflow-hidden rounded-xl shadow-2xl">
        <Image
          src={image}
          alt={title}
          fill
          sizes="220px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="line-clamp-1 text-lg font-bold text-white">
            {title}
          </h3>



        </div>
      </div>
    </Link>
  );
}