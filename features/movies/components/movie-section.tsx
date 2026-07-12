import Link from "next/link";
import MovieCard from "./movie-card";

type MovieSectionProps = {
  title: string;
  href: string;
  movies: T_Movie[];
}

export default function MovieSection({ title, href, movies }: MovieSectionProps) {
  return (
    <section className="bg-zinc-950 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl font-black text-white">
            {title}
          </h2>


          <Link
            href={href}
            className="text-sm font-medium text-red-500 hover:text-red-400"
          >
            Xem tất cả →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {movies.map((movie) => (
            <MovieCard key={movie._id}
              movie={movie}
              className="trending-movie"
            />
          ))}
        </div>
      </div>
    </section>
  );
}