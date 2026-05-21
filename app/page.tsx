import CarouselAutoplay from "@/components/carousel-autoplay";
import { buttonVariants } from "@/components/ui/button";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import VideoCard from "@/components/video-card";
import recommendVideos from "@/lib/recommend-videos.json";
import { cn } from "@/lib/utils";
import { getLatestVideos, getVideosByCountry } from "@/lib/video";
import { ArrowRight01Icon, Fire } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const dataLatestVideos = await getLatestVideos({ page: 1 });
  const dataVideos1 = await getVideosByCountry("trung-quoc", {
    page: "1",
    limit: "24",
  });
  const dataVideos2 = await getVideosByCountry("han-quoc", {
    page: "1",
    limit: "24",
  });

  const currentYear = new Date().getFullYear();

  return (
    <div className="_container space-y-4">
      <div className="">
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
                <CarouselItem key={videoItem._id}>
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
      </div>
      <section className="">
        <CarouselAutoplay delay={123456}>
          <CarouselContent>
            {[
              {
                name: "Phim năm " + currentYear,
                slug: `/nam/${currentYear}`,
                className: "bg-linear-to-r from-lime-700 to-green-700",
              },
              {
                name: "Phim lẻ",
                slug: "/danh-sach/phim-le",
                className: "bg-linear-to-r from-orange-700 to-amber-700",
              },
              {
                name: "Phim tình cảm",
                slug: "/the-loai/tinh-cam",
                className: "bg-linear-to-r from-fuchsia-700 to-pink-700",
              },
              {
                name: "Hoạt hình",
                slug: "/danh-sach/hoat-hinh",
                className: "bg-linear-to-r from-rose-700 to-red-700",
              },
              {
                name: "Phim lồng tiếng",
                slug: "/danh-sach/phim-long-tieng",
                className: "bg-linear-to-r from-sky-700 to-blue-700",
              },
              {
                name: "Phim ma",
                slug: "/the-loai/kinh-di",
                className: "bg-linear-to-r from-gray-700 to-neutral-700",
              },
            ].map((item: any) => (
              <CarouselItem
                key={item.slug}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <Link
                  href={item.slug}
                  className={cn(
                    "rounded-md p-4 flex items-center justify-center w-full h-16 text-foreground",
                    item.className,
                  )}
                >
                  {item.name}
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </CarouselAutoplay>
      </section>
      {(recommendVideos as RecommendedVideo[]).length > 0 ? (
        <section className="space-y-2">
          <div className="flex items-center justify-between bg-muted p-2 rounded-sm">
            <div className="font-semibold text-lg flex items-center gap-1">
              <HugeiconsIcon icon={Fire} size={18} /> Phim hot
            </div>
            <Link
              href={`/danh-sach/phim-bo?country=trung-quoc`}
              className="text-xs flex items-center gap-0.5 hover:text-destructive transition-colors duration-200"
            >
              Xem tất cả
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
            </Link>
          </div>
          <div className="">
            <CarouselAutoplay delay={12345}>
              <CarouselContent>
                {recommendVideos.slice(0, 20).map((videoItem) => (
                  <CarouselItem
                    key={videoItem.slug}
                    className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                  >
                    <VideoCard videoItem={videoItem} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </CarouselAutoplay>
          </div>
        </section>
      ) : null}
      <section className="space-y-2">
        <div className="flex items-center justify-between bg-muted p-2 rounded-sm">
          <div className="font-semibold text-lg">Phim bộ Trung Quốc</div>
          <Link
            href={`/danh-sach/phim-bo?country=trung-quoc`}
            className="text-xs flex items-center gap-0.5 hover:text-destructive transition-colors duration-200"
          >
            Xem tất cả
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </Link>
        </div>
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
        <div className="flex items-center justify-between bg-muted p-2 rounded-sm">
          <div className="font-semibold text-lg">Phim bộ Hàn Quốc</div>
          <Link
            href={`/danh-sach/phim-bo?country=han-quoc`}
            className="text-xs flex items-center gap-0.5 hover:text-destructive transition-colors duration-200"
          >
            Xem tất cả
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </Link>
        </div>
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
    </div>
  );
}
