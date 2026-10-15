import { castsApi } from "@/features/casts/api";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  const profile = await castsApi.profile(id);

  return NextResponse.json({ data: profile, status: true, message: "success" });
};
