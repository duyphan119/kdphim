import Link from "next/link";
import MovieCard from "./movie-card";

type HotMoviesProps = {
  movies: T_Movie[];
}

export default function HotMovies({ movies }: HotMoviesProps) {
  return (
    <section className="bg-zinc-950 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-black text-white">
            🔥 Phim hot
          </h2>

          <Link
            href="/phim-hot"
            className="text-sm font-medium text-red-500 hover:text-red-400"
          >
            Xem tất cả →
          </Link>
        </div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8">
          {movies.map((movie) => (
            <MovieCard key={movie._id}
              movie={movie}
              className="hot-movie"
            />
          ))}

        </div>
      </div>
    </section>
  );
}