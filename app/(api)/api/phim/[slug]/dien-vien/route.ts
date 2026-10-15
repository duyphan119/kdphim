import { castsApi } from "@/features/casts/api";
import { moviesApi } from "@/features/movies/api";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) => {
  const { slug } = await params;

  const movieData = await moviesApi.detailsBySlug(slug);
  if (!movieData || !movieData.movie) return;
  const data = await castsApi.casts(slug, {
    countries: movieData.movie.country,
    keyword: movieData.movie.name,
    type: movieData.movie.type,
    year: movieData.movie.year,
  });
  return NextResponse.json({ data, status: true, message: "success" });
};
