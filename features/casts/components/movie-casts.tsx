import React from 'react'
import { CastsResponse } from '../api'
import Image from 'next/image';
import Link from 'next/link';

type MovieCastsProps = {
  peoplesData: CastsResponse | null;
  actors: string[]
}

export default function MovieCasts({ peoplesData, actors }: MovieCastsProps) {
  return (
    <div className="rounded-sm border border-border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Diễn viên</h2>
      {peoplesData && peoplesData.peoples.length > 0 ? <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4 mt-4">
        {peoplesData.peoples.map((item, index) => (
          <div key={index} className="border border-muted">
            <Link
              href={`/dien-vien/${item.tmdb_people_id || item.id}`}
              title={item.name}
              className="relative aspect-[2/3] block"
            >
              <Image
                src={
                  item.profile_path
                    ? `${peoplesData?.profile_sizes.h632}${item.profile_path}`
                    : item.gender === 1
                      ? "/images/placeholder-cast-female.png"
                      : "/images/placeholder-cast-male.png"
                }
                alt="Profile"
                fill
                className="rounded-ss-md rounded-se-md object-cover"
              />
            </Link>
            <div className="p-1 flex flex-col items-center">
              <Link
                href={`/dien-vien/${item.tmdb_people_id || item.id}`}
                title={item.name}
                className="text-sm hover:text-destructive transition-colors duration-200"
              >
                {item.name}
              </Link>
              <div className="text-muted-foreground text-xs text-center">
                {item.character}
              </div>
            </div>
          </div>
        ))}
      </div> : <p className="mt-4">{actors.join(", ")}</p>}
    </div>
  )
}