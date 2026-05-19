import Breadcrumb from "@/components/breadcrumb";
import VideoCard from "@/components/video-card";
import recommendVideos from "@/lib/recommend-videos.json";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="_container">
      <Breadcrumb
        items={[{ name: "Phim đề xuất", position: 1, isCurrent: true }]}
      />
      <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {recommendVideos.map((videoItem, index) => (
          <div key={index} className="col-span-1">
            <VideoCard videoItem={videoItem} />
          </div>
        ))}
      </div>
    </div>
  );
}
