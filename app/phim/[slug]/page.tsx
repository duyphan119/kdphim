import VideoDetails from "@/components/video-details";
import { getVideo } from "@/lib/video";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const awaitedParams = await params;

  const { movie, episodes } = await getVideo(awaitedParams.slug);

  if (!movie) return null;

  return <VideoDetails video={movie} episodes={episodes} />;
}
