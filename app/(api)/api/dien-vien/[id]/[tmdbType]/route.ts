import { castsApi } from "@/features/casts/api";
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

  return NextResponse.json({
    status: true,
    message: "success",
    data: movies,
  });
};
