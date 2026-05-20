"use client";

import React, { useEffect, useState } from "react";
import VideoCard from "./video-card";
import { getVideosByCast } from "@/lib/video";

type Props = {
  castId: string;
};

export default function CastVideos({ castId }: Props) {
  const [data, setData] = useState<{
    tvList: VideoDetailsResponse["movie"][];
    movieList: VideoDetailsResponse["movie"][];
  }>({
    tvList: [],
    movieList: [],
  });

  useEffect(() => {
    const fetchCastVideos = async () => {
      const data = await getVideosByCast(castId);
      setData(data);
    };

    fetchCastVideos();
  }, [castId]);

  const { tvList, movieList } = data;

  return (
    <div className="col-span-4 md:col-span-3 space-y-4">
      {tvList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5">
            <div className="p-4 bg-muted rounded-sm uppercase">
              <div className="">Phim bộ</div>
            </div>
          </div>
          {tvList.map((videoItem) => (
            <div key={videoItem._id} className="col-span-1">
              <VideoCard videoItem={videoItem} />
            </div>
          ))}
        </div>
      ) : null}
      {movieList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5">
            <div className="p-4 bg-muted rounded-sm uppercase">
              <div className="">Phim lẻ</div>
            </div>
          </div>
          {movieList.map((videoItem) => (
            <div key={videoItem._id} className="col-span-1">
              <VideoCard videoItem={videoItem} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
