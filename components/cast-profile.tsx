"use client";

import { getVideosByCast } from "@/lib/video";
import { useEffect } from "react";

type Props = {
  castId: string;
};

export default function CastProfile({ castId }: Props) {
  useEffect(() => {
    getVideosByCast(castId);
  }, [castId]);
  return <div>CastProfile</div>;
}
