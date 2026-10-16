import { castsApi } from "@/features/casts/api";
// import { countriesApi } from "@/features/countries/api";
import { moviesApi } from "@/features/movies/api";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string; tmdbType: string }> },
) => {
  const { id, tmdbType } = await params;
  if (!["tv", "movie"].includes(tmdbType))
    return NextResponse.json({
      status: false,
      message: "type is invalid",
      data: [],
    });

  const movies = await castsApi.movies(id, tmdbType);

  // const tmdbMovies = await Promise.all(
  //   movies.map(({ id }) =>
  //     moviesApi.detailsByTmdb(id, tmdbType as "tv" | "movie"),
  //   ),
  // );

  // const countries = await countriesApi.itemsInTmdb();

  const searchResults = await Promise.all(
    movies.map((item: any) =>
      moviesApi.search(item.name || item.title, {
        year: (item.first_air_date || item.release_date).split("-")[0],
      }),
    ),
  );

  const data = searchResults
    .filter(
      (item) =>
        item &&
        item.items.filter(
          (el) => el.type === (tmdbType === "tv" ? "series" : "single"),
        ).length > 1,
    )
    .map((item) => item?.items[0] as T_Movie);

  return NextResponse.json({
    status: true,
    message: "success",
    data,
  });
};
