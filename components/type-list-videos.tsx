"use client";

import { getVideos } from "@/lib/video/data";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import VideoCard from "./video-card";
import VideosFilter from "./videos-filter";
import VideosPagination from "./videos-pagination";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import Link from "next/link";
import { VideosParams } from "@/lib/video/types";

type Props = {
  type_list: string;
  searchParams: VideosParams;
};

export default function TypeListVideos({ searchParams, type_list }: Props) {
  const { data: dataVideos } = useQuery({
    queryKey: ["type-list-videos"],
    queryFn: () =>
      getVideos({
        type_list,
        category: searchParams.category || undefined,
        country: searchParams.country || undefined,
        year: searchParams.year || undefined,
        sort_field: searchParams.sort_field || undefined,
        sort_type: (searchParams.sort_type as "asc" | "desc") || undefined,
        page: searchParams.page || "1",
        limit: searchParams.limit || "16",
      }),
  });

  if (!dataVideos) return null;

  return (
    <div className="p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {dataVideos?.breadCrumb.map((item) => (
            <Fragment key={item.name}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {item.slug ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.slug}>{item.name}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-4 flex justify-between items-center gap-2">
        <VideosFilter defaultParams={searchParams} />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {dataVideos?.items.map((videoItem) => (
          <div key={videoItem._id} className="col-span-1">
            <VideoCard
              imageDomain={dataVideos?.APP_DOMAIN_CDN_IMAGE + ""}
              videoItem={videoItem}
            />
          </div>
        ))}
        <div className="col-span-2">
          {dataVideos ? (
            <VideosPagination pagination={dataVideos.params.pagination} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
