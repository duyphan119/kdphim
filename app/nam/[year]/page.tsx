import { VideosParams } from "@/lib/video/data";

type Props = {
  params: Promise<{ year: string }>;
  searchParams: Promise<VideosParams>;
};

export default function Page({ params, searchParams }: Props) {
  return <div>Page</div>;
}
