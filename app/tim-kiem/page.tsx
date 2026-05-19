import Breadcrumb from "@/components/breadcrumb";
import VideoCard from "@/components/video-card";
import VideosFilter from "@/components/videos-filter";
import VideosPagination from "@/components/videos-pagination";
import { searchVideos } from "@/lib/video";

type Props = {
  searchParams: Promise<VideosParams & { keyword: string }>;
};

export default async function Page({ searchParams }: Props) {
  const awaitedSearchParams = await searchParams;

  const { keyword, ...otherParams } = awaitedSearchParams;

  const { data } = await searchVideos(keyword, otherParams);

  return (
    <div className="_container space-y-4">
      <Breadcrumb items={data.breadCrumb} />

      <div className="">
        <VideosFilter
          defaultParams={awaitedSearchParams}
          isSearchFilter={true}
        />
      </div>

      <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.items.map((videoItem) => (
          <div key={videoItem._id} className="col-span-1">
            <VideoCard
              videoItem={videoItem}
              imageDomain={data.APP_DOMAIN_CDN_IMAGE}
            />
          </div>
        ))}
      </div>

      <div className="">
        <VideosPagination
          pagination={data.params.pagination}
          searchParams={awaitedSearchParams}
        />
      </div>
    </div>
  );
}
