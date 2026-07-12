"use client";

import MovieCard from "./movie-card";

type RelatedMoviesProps = {
  movies: T_Movie[]
}

export default function RelatedMovies({ movies }: RelatedMoviesProps) {

  return (
    <div className="rounded-sm border border-border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Phim tương tự</h2>

      <div className="mt-4 grid grid-cols-4 gap-2 lg:gap-4">
        {movies.map((item) => (
          <div key={item._id} className="col-span-2 lg:col-span-1">
            <MovieCard
              movie={item}
            />
          </div>
        ))}
      </div>
    </div>
  )
}