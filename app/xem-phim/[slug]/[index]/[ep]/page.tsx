import VideoDetails from "@/components/video-details";
import { getVideo } from "@/lib/video";

type Props = {
  params: Promise<{ slug: string; ep: string; index: string }>;
};

export default async function Page({ params }: Props) {
  const { slug, ep: episodeSlug, index } = await params;

  const { movie, episodes } = await getVideo(slug);

  if (!movie) return null;
  const movieTypeSlug = movie.type === "series" ? "phim-bo" : "phim-le";
  const movieTypeName = movie.type === "series" ? "Phim bộ" : "Phim lẻ";
  const movieSlug = movie.slug;

  let firstLink: string = `/phim/${movieSlug}`;

  if (episodes?.length) {
    // find first available
    for (let i = 0; i < episodes.length; i++) {
      const sd = episodes[i].server_data;
      if (sd && sd.length) {
        const ep = sd[0];
        firstLink = `/xem-phim/${movieSlug}/${i}/${ep.slug || ep.filename}`;
        break;
      }
    }
  }

  const serverIndex = Number(index);
  const currentServer = episodes?.[serverIndex];
  const currentEpisode = currentServer?.server_data?.find(
    (ep) => ep.slug === episodeSlug,
  );

  // Calculate previous and next episode links
  const currentEpisodeIndex =
    currentServer?.server_data?.findIndex((ep) => ep.slug === episodeSlug) ??
    -1;

  let prevLink: string | undefined;
  let nextLink: string | undefined;

  // Previous episode
  if (currentEpisodeIndex > 0) {
    const prevEpisode = currentServer?.server_data?.[currentEpisodeIndex - 1];
    if (prevEpisode) {
      prevLink = `/xem-phim/${movieSlug}/${serverIndex}/${prevEpisode.slug}`;
    }
  } else if (serverIndex > 0 && episodes) {
    // Previous server's last episode
    const prevServer = episodes[serverIndex - 1];
    const lastEpisodeInPrevServer =
      prevServer.server_data[prevServer.server_data.length - 1];
    if (lastEpisodeInPrevServer) {
      prevLink = `/xem-phim/${movieSlug}/${serverIndex - 1}/${lastEpisodeInPrevServer.slug}`;
    }
  }

  // Next episode
  if (currentEpisodeIndex >= 0 && currentServer?.server_data) {
    if (currentEpisodeIndex < currentServer.server_data.length - 1) {
      const nextEpisode = currentServer.server_data[currentEpisodeIndex + 1];
      if (nextEpisode) {
        nextLink = `/xem-phim/${movieSlug}/${serverIndex}/${nextEpisode.slug}`;
      }
    } else if (serverIndex < (episodes?.length ?? 0) - 1 && episodes) {
      // Next server's first episode
      const nextServer = episodes[serverIndex + 1];
      if (nextServer.server_data.length > 0) {
        nextLink = `/xem-phim/${movieSlug}/${serverIndex + 1}/${nextServer.server_data[0].slug}`;
      }
    }
  }

  return (
    <VideoDetails
      video={movie}
      hideButtons={true}
      episodes={episodes}
      currentEpisodeSlug={currentEpisode?.slug}
      serverIndex={serverIndex}
    >
      <div className={`rounded-lg overflow-hidden bg-slate-950 aspect-video`}>
        {currentEpisode ? (
          <iframe
            src={currentEpisode.link_embed}
            width="100%"
            height="100%"
            allowFullScreen
            allow="fullscreen"
            className="w-full h-full"
          />
        ) : null}
      </div>
    </VideoDetails>
  );
}
