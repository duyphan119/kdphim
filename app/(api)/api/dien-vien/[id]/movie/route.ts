import { castsApi } from "@/features/casts/api";
import { moviesApi } from "@/features/movies/api";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  let movies = (await castsApi.movies(id, "movie")) as T_MovieCredit[];

  const tmdbMovies = await Promise.all(
    movies.map(({ id }) => moviesApi.detailsByTmdb(id, "tv")),
  );
  const otherMovies: T_MovieCredit[] = [];

  tmdbMovies.forEach((item, index) => {
    if (item?.movie) return;

    otherMovies.push(movies[index]);
  });

  let searchResults = (
    await Promise.all(
      otherMovies.map((item) =>
        moviesApi.search(item.title, {
          year: item.release_date?.split("-")?.[0] || undefined,
        }),
      ),
    )
  ).map(
    (result, index) =>
      (result &&
        (result.items.length > 1
          ? result.items.filter(
              (item) => item.name === otherMovies[index].title,
            )
          : result.items)) ||
      [],
  );

  searchResults = searchResults.filter((result) => result.length === 1);

  let data = tmdbMovies
    .filter((item) => item?.movie)
    .map((item) => item?.movie) as T_Movie[];

  searchResults.forEach((items) => {
    const index = data.findIndex((item) => item._id === items[0]._id);

    if (index === -1) {
      data.push(items[0]);
    }
  });

  data.sort(
    (a, b) =>
      new Date(b?.created?.time || b.year).getTime() -
      new Date(a?.created?.time || a.year).getTime(),
  );

  return NextResponse.json({
    status: true,
    message: "success",
    data,
  });
};
