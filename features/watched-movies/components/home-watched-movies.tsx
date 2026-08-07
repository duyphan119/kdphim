"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { watchedMoviesApi } from "../api";
import WatchedMovieCard from "./watched-movie-card";



export default function HomeWatchedMovies() {
  const [movies, setMovies] = useState<T_WatchedMovie[]>([])

  useEffect(() => {
    (() => {
      const { items: watchedMovies } = watchedMoviesApi.items({ page: "1", limit: "6" });
      setMovies(watchedMovies)
    })()
  }, [])


  if (movies.length === 0) return null;
  return (
    <section className="bg-zinc-950 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-black text-white">
            Xem tiếp
          </h2>

          <Link
            href="/da-xem"
            className="text-sm font-medium text-red-500 hover:text-red-400"
          >
            Xem tất cả →
          </Link>
        </div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {movies.map((movie) => (
            <WatchedMovieCard key={movie.slug}
              movie={movie}
              imageType="thumb"
            />
          ))}

        </div>
      </div>
    </section>
  )
}