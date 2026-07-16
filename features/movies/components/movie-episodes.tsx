import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

type MovieEpisodesProps = {
  episodes: T_Episode[]
  serverIndex: number;
  currentEpisodeSlug: string;
  movieSlug: string;
}

export default function MovieEpisodes({ episodes, currentEpisodeSlug, serverIndex, movieSlug }: MovieEpisodesProps) {
  return (
    <div className="">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Danh sách tập</h2>
          <p className="text-sm text-zinc-500">
            {episodes.length} server khả dụng
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {episodes.map((server, index) => {
          const serverIsActive = index === serverIndex;
          return (
            <div
              key={server.server_name}
              className="rounded-sm border border-border bg-zinc-900 p-4"
            >
              <h3 className="text-sm font-semibold">
                {server.server_name}
                {serverIsActive && (
                  <Badge
                    variant={"destructive"}
                    className="ml-2 -translate-y-px"
                  >
                    Đang xem
                  </Badge>
                )}
              </h3>

              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                {server.server_data.map((item) => {
                  const episodeIsActive =
                    serverIsActive &&
                    item.slug === currentEpisodeSlug;
                  return (
                    <Link
                      key={item.slug || item.filename}
                      title={item.name}
                      href={`/xem-phim/${movieSlug}/${index}/${item.slug}`}
                      className={buttonVariants({
                        variant: episodeIsActive
                          ? "default"
                          : "background",
                        className:
                          "col-span-1 rounded-sm text-center",
                      })}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}