import { castsApi } from "@/features/casts/api";
import { moviesApi } from "@/features/movies/api";
import VideoDetails from "@/features/movies/components/video-details";
import { stripHtml } from "@/lib/utils";
import { getVideo } from "@/lib/video";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const awaitedParams = await params;

  const { movie } = await getVideo(awaitedParams.slug);

  if (!movie) {
    return {
      title: "KDPhim | Không tìm thấy phim",
      description: "Phim không tồn tại hoặc đã bị xoá.",
    };
  }

  const title = `KDPhim |  ${movie.name}`;

  return {
    title,
    description: stripHtml(movie.content),
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const data = await moviesApi.detailsBySlug(slug);

  if (!data || !data.movie) return notFound()

  const { movie, episodes } = data;

  const [related, top, casts] = await Promise.allSettled([
    moviesApi.related({ countrySlug: movie.country[0].slug, categorySlug: movie.category.map(({ slug }) => slug), currentSlug: slug }),
    moviesApi.hot({ limit: 24 }),
    castsApi.casts(slug)
  ]);

  const relatedMovies = related.status === 'fulfilled' ? related.value : [];
  const hotMovies = (top.status === 'fulfilled' ? top.value?.items : null) || []
  const peoplesData = casts.status === 'fulfilled' ? casts.value : null;

  return <VideoDetails movie={movie} episodes={episodes} hotMovies={hotMovies} relatedMovies={relatedMovies} peoplesData={peoplesData} />;
}

