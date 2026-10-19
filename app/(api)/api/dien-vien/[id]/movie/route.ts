import { castsApi } from "@/features/casts/api";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  const data = await castsApi.singleMovies(id);

  return NextResponse.json({
    status: true,
    message: "success",
    data,
  });
};
