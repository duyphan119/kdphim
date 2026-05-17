import TypeListVideos from "@/components/type-list-videos";
import { VideosParams } from "@/lib/video/data";

type Props = {
  params: Promise<{ type: string }>;
  searchParams: Promise<VideosParams>;
};

export default async function Page({ params, searchParams }: Props) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  return (
    <TypeListVideos
      type_list={awaitedParams.type}
      searchParams={awaitedSearchParams}
    />
  );
}
