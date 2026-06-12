import CarouselAutoplay from "@/components/carousel-autoplay";
import SectionHeader from "@/components/section-header";
import { hotCasts, sectionTitleVariants } from "@/lib/constants";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import VideoCard from "@/components/video-card";
import recommendVideos from "@/lib/recommend-videos.json";
import { cn } from "@/lib/utils";
import {
  getLatestVideos,
  getVideosByCountry,
  getVideosByTypeList,
} from "@/lib/video";
import {
  Female02Icon,
  Fire,
  Globe02Icon,
  PlayCircleIcon,
  SparklesIcon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const dataLatestVideos = await getLatestVideos({ page: 1 });
  const dataVideos1 = await getVideosByCountry("trung-quoc", {
    page: "1",
    limit: "12",
  });
  const dataVideos2 = await getVideosByCountry("han-quoc", {
    page: "1",
    limit: "12",
  });
  const dataVideos3 = await getVideosByTypeList("hoat-hinh", {
    page: "1",
    limit: "12",
    country: "nhat-ban",
  });

  const currentYear = new Date().getFullYear();

  return (
    <div className="_container space-y-4 pb-4">
      <section className="">
        <CarouselAutoplay delay={4567}>
          <CarouselContent>
            {dataLatestVideos?.items
              ?.filter(
                (item) =>
                  !item.country.find((c) =>
                    ["han-quoc", "trung-quoc"].includes(c.slug),
                  ) || item.type !== "series",
              )
              .map((videoItem) => (
                <CarouselItem key={videoItem._id} >
                  <div className="relative aspect-video w-full">
                    <Image
                      unoptimized
                      src={`https://phimapi.com/image.php?url=${videoItem.thumb_url}`}
                      alt={videoItem.slug}
                      fill={true}
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      loading="eager"
                      className="object-cover"
                    />
                    <div className="absolute left-0 bottom-0 max-w-[60%] bg-black/40 p-4 text-white shadow-xl flex flex-col justify-end">
                      <Link
                        href={`/phim/${videoItem.slug}`}
                        className="text-sm font-semibold line-clamp-2 hover:text-destructive transition-colors duration-200"
                      >
                        {videoItem.name}
                      </Link>
                      <div className="mt-3 space-y-1 text-xs text-secondary-foreground">
                        <p>
                          Thể loại:{" "}
                          {videoItem.category.map((category, index) => (
                            <span key={category.id}>
                              <Link
                                href={`/the-loai/${category.slug}`}
                                className=" hover:text-destructive transition-colors duration-200"
                              >
                                {category.name}
                              </Link>
                              {index < videoItem.category.length - 1
                                ? ", "
                                : ""}
                            </span>
                          ))}
                        </p>
                        <p>
                          Quốc gia:{" "}
                          {videoItem.country.map((country, index) => (
                            <span key={country.id}>
                              <Link
                                href={`/quoc-gia/${country.slug}`}
                                className=" hover:text-destructive transition-colors duration-200"
                              >
                                {country.name}
                              </Link>
                              {index < videoItem.country.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </p>
                      </div>
                      <div className="mt-4">
                        <Link
                          href={`/phim/${videoItem.slug}`}
                          className="rounded-full bg-destructive px-4 md:px-40 lg:px-56 py-2 text-xs font-semibold text-destructive-foreground shadow-lg transition-colors duration-200 hover:bg-destructive/90"
                        >
                          Xem ngay
                        </Link>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </CarouselAutoplay>
      </section>
      <section className="space-y-2">
        <SectionHeader
          title="Top phim nổi bật"
          icon={Fire}
          iconColor="text-orange-500"
          gradientClassName="bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 bg-clip-text text-transparent tracking-wide bg-[length:200%_200%] animate-gradient"
          href="/phim-hot"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {recommendVideos.slice(0, 12).map((videoItem) => (
            <div key={videoItem.slug} className="col-span-1">
              <VideoCard
                videoItem={videoItem}
              />
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-2">
        <SectionHeader
          title="Hoa ngữ đặc sắc"
          icon={Globe02Icon}
          iconColor="text-red-500"
          gradientClassName="bg-gradient-to-r from-red-500 via-rose-500 to-orange-400 bg-clip-text text-transparent tracking-wide bg-[length:200%_200%] animate-gradient"
          href="/danh-sach/phim-bo?country=trung-quoc"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {dataVideos1?.data?.items?.map((videoItem) => (
            <div key={videoItem._id} className="col-span-1">
              <VideoCard
                videoItem={videoItem}
                imageDomain={dataVideos1?.data.APP_DOMAIN_CDN_IMAGE}
              />
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-2">
        <SectionHeader
          title="K-Drama gây sốt"
          icon={SparklesIcon}
          iconColor="text-pink-500"
          gradientClassName="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent tracking-wide bg-[length:200%_200%] animate-gradient"
          href="/danh-sach/phim-bo?country=han-quoc"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {dataVideos2?.data?.items?.map((videoItem) => (
            <div key={videoItem._id} className="col-span-1">
              <VideoCard
                videoItem={videoItem}
                imageDomain={dataVideos2?.data.APP_DOMAIN_CDN_IMAGE}
              />
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-2">
        <SectionHeader
          title="Thế giới Anime"
          icon={PlayCircleIcon}
          iconColor="text-violet-500"
          gradientClassName="bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent tracking-wide bg-[length:200%_200%] animate-gradient"
          href="/danh-sach/hoat-hinh"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {dataVideos3?.data?.items?.map((videoItem) => (
            <div key={videoItem._id} className="col-span-1">
              <VideoCard
                videoItem={videoItem}
                imageDomain={dataVideos3?.data.APP_DOMAIN_CDN_IMAGE}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
