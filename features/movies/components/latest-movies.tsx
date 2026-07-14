import Link from "next/link";
import LatestMovieItem from "./latest-movie-item";

type LatestMoviesProps = {
  movies: T_Movie[]
}

export default function LatestMovies({ movies }: LatestMoviesProps) {
  return (
    <section className="bg-zinc-900 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-black text-white">
            Phim mới cập nhật
          </h2>

          <Link
            href="/latest"
            className="text-sm font-medium text-red-500 transition hover:text-red-400"
          >
            Xem tất cả →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <LatestMovieItem
              key={movie._id}
              movie={movie}

            />
          ))}
        </div>
      </div>
    </section>
  );
}