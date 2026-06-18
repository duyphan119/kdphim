import Breadcrumb from "@/components/breadcrumb";
import CastVideos from "@/components/cast-videos";
import { getCastDetails } from "@/lib/cast";
import { TMDB_IMAGE_DOMAIN } from "@/lib/constants";
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
  if (!castDetails) return { title: "KDPhim | Diễn viên", description: "Thông tin và phim của diễn viên" };

  return {
    title: `KDPhim | Diễn viên ${castDetails.name}`,
    description: `Thông tin và phim của diễn viên ${castDetails.name}`,
  };
};

export default async function Page({ params }: Props) {
  const awaitedParams = await params;

  const castDetails = await getCastDetails(awaitedParams.castId);
  if (!castDetails) return null;

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
            <div className="relative aspect-[2/3] overflow-hidden">
              <Image
                unoptimized
                src={
                  castDetails.profile_path
                    ? `${TMDB_IMAGE_DOMAIN}${castDetails.profile_path}`
                    : castDetails.gender === 1
                      ? "/images/placeholder-cast-female.png"
                      : "/images/placeholder-cast-male.png"
                }
                alt={castDetails.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                loading="eager"
              />

              <div className="absolute inset-x-2 bottom-2 bg-background/80 text-muted-foreground p-2 rounded-lg text-center flex items-center justify-center gap-2 font-semibold">
                <HugeiconsIcon
                  icon={castDetails.gender === 1 ? Female02Icon : Male02Icon}
                  size={16}
                />

                <span className="font-semibold">
                  {castDetails.name}
                </span>
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
