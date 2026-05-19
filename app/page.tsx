import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getLatestVideos, getVideosByCountry } from "@/lib/video";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import recommendVideos from "@/lib/recommend-videos.json";
import VideoCard from "@/components/video-card";

export default async function Home() {
  const dataLatestVideos = await getLatestVideos({ page: 1 });
  const dataVideos1 = await getVideosByCountry("trung-quoc", {
    page: "1",
    limit: "20",
  });
  const dataVideos2 = await getVideosByCountry("han-quoc", {
    page: "1",
    limit: "20",
  });

  return (
    <div className="_container space-y-4">
      <div className="">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
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
        </Carousel>
      </div>
      {(recommendVideos as RecommendedVideo[]).length > 0 ? (
        <section className="space-y-2">
          <div className="flex items-center justify-between bg-muted p-2">
            <div className="font-semibold text-lg">Có thể bạn sẽ thích</div>
            <Link
              href={`/danh-sach/phim-bo?country=trung-quoc`}
              className="text-xs flex items-center gap-0.5 hover:text-destructive transition-colors duration-200"
            >
              Xem tất cả
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {recommendVideos.map((videoItem) => (
              <div key={videoItem.slug} className="col-span-1">
                <VideoCard videoItem={videoItem} />
              </div>
            ))}
          </div>
        </section>
      ) : null}
      <section className="space-y-2">
        <div className="flex items-center justify-between bg-muted p-2">
          <div className="font-semibold text-lg">Phim bộ Trung Quốc</div>
          <Link
            href={`/danh-sach/phim-bo?country=trung-quoc`}
            className="text-xs flex items-center gap-0.5 hover:text-destructive transition-colors duration-200"
          >
            Xem tất cả
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
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
        <div className="flex items-center justify-between bg-muted p-2">
          <div className="font-semibold text-lg">Phim bộ Hàn Quốc</div>
          <Link
            href={`/danh-sach/phim-bo?country=han-quoc`}
            className="text-xs flex items-center gap-0.5 hover:text-destructive transition-colors duration-200"
          >
            Xem tất cả
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
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
