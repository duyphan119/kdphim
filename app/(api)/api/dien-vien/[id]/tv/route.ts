import { castsApi } from "@/features/casts/api";
import { moviesApi } from "@/features/movies/api";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  let movies = (await castsApi.movies(id, "tv")) as T_TvCredit[];

  const tmdbMovies = await Promise.all(
    movies.map(({ id }) => moviesApi.detailsByTmdb(id, "tv")),
  );
  const otherMovies: T_TvCredit[] = [];

  tmdbMovies.forEach((item, index) => {
    if (item?.movie) return;

    otherMovies.push(movies[index]);
  });

  let searchResults = (
    await Promise.all(otherMovies.map((item) => moviesApi.search(item.name)))
  ).map(
    (result, index) =>
      (result &&
        result.items.filter((item) =>
          item.name.startsWith(otherMovies[index].name),
        )) ||
      [],
  );

  const videoResults = searchResults.flat();

  let data = tmdbMovies
    .filter((item) => item?.movie)
    .map((item) => item?.movie) as T_Movie[];

  let finalItems: T_Movie[] = [];

  data.forEach((dataItem) => {
    const index = finalItems.findIndex((item) => item._id === dataItem._id);

    if (index === -1) {
      finalItems.push(dataItem);
    }
  });

  videoResults.forEach((videoResult) => {
    const index = finalItems.findIndex((item) => item._id === videoResult._id);

    if (
      index === -1 &&
      (videoResult.type === "series" ||
        !videoResult.last_episodes ||
        (videoResult.last_episodes && videoResult.last_episodes.length > 0))
    ) {
      finalItems.push(videoResult);
    }
  });

  data.sort((a, b) => new Date(b.year).getTime() - new Date(a.year).getTime());

  return NextResponse.json({
    status: true,
    message: "success",
    // data: finalItems,
    data: finalItems.map((item) => item.slug),
  });
};
