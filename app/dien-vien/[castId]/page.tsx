import Breadcrumb from "@/components/breadcrumb";
import CastVideos from "@/components/cast-videos";
import VideoCard from "@/components/video-card";
import { getCastDetails } from "@/lib/cast";
import { getVideosByCast } from "@/lib/video";
import {
  Birthday,
  Female02Icon,
  Hospital,
  Male02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: Promise<{ castId: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const awaitedParams = await params;

  const castDetails = await getCastDetails(awaitedParams.castId);

  return {
    title: `KDPhim | Diễn viên ${castDetails.name}`,
    description: `Thông tin và phim của diễn viên ${castDetails.name}`,
  };
};

export default async function Page({ params }: Props) {
  const awaitedParams = await params;

  const castDetails = await getCastDetails(awaitedParams.castId);

  return (
    <div className="_container py-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4">
          <Breadcrumb
            items={[
              {
                isCurrent: true,
                name: castDetails.name,
                position: 1,
              },
            ]}
          />
        </div>
        <div className="col-span-4 md:col-span-1">
          <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm">
            <div className="relative aspect-2/3 overflow-hidden">
              <Image
                unoptimized
                src={
                  castDetails.profile_path
                    ? `https://image.tmdb.org/t/p/h632${castDetails.profile_path}`
                    : castDetails.gender === 1
                      ? "/images/placeholder-cast-female.png"
                      : "/images/placeholder-cast-male.png"
                }
                alt={castDetails.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 backdrop-blur-md">
                  <HugeiconsIcon
                    icon={castDetails.gender === 1 ? Female02Icon : Male02Icon}
                    size={16}
                  />

                  <h2 className="line-clamp-1 text-lg font-semibold">
                    {castDetails.name}
                  </h2>
                </div>
              </div>
            </div>

            <div className="space-y-3 p-4">
              {castDetails.birthday && (
                <div className="flex items-start gap-3 rounded-xl bg-muted/40 p-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                    <HugeiconsIcon icon={Birthday} size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Ngày sinh</p>
                    <p className="text-sm font-medium">
                      {castDetails.birthday}
                    </p>
                  </div>
                </div>
              )}

              {castDetails.place_of_birth && (
                <div className="flex items-start gap-3 rounded-xl bg-muted/40 p-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                    <HugeiconsIcon icon={Hospital} size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Nơi sinh</p>
                    <p className="text-sm font-medium leading-relaxed">
                      {castDetails.place_of_birth}
                    </p>
                  </div>
                </div>
              )}

              {castDetails.biography && (
                <div className="rounded-xl bg-muted/40 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-4 w-1 rounded-full bg-primary" />

                    <h3 className="text-sm font-semibold tracking-wide">
                      Tiểu sử
                    </h3>
                  </div>

                  <p className="text-sm leading-7 text-muted-foreground whitespace-pre-line">
                    {castDetails.biography}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <CastVideos castId={awaitedParams.castId} />
      </div>
    </div>
  );
}
