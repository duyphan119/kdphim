

import { moviesApi } from "@/features/movies/api";
import HeroBanner from "@/features/movies/components/hero-banner";
import HotMovies from "@/features/movies/components/hot-movies";
import LatestMovies from "@/features/movies/components/latest-movies";
import MovieCard from "@/features/movies/components/movie-card";
import MovieSection from "@/features/movies/components/movie-section";
import HomeWatchedMovies from "@/features/watched-movies/components/home-watched-movies";
import Link from "next/link";


export default async function Page() {
  const { bannerMovie, hotMovies, latestMovies, chineseMovies, koreanMovies, japaneseMovies } = await moviesApi.home();


  return (
    <>
      {bannerMovie ? <HeroBanner movie={bannerMovie.movie} episodes={bannerMovie.episodes} /> : null}
      <HomeWatchedMovies />
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

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {hotMovies.map((movie) => (
              <MovieCard key={movie._id}
                movie={movie}
                className="hot-movie"
              />
            ))}

          </div>
        </div>
      </section>
      <section className="bg-zinc-950 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-black text-white">
              Phim mới cập nhật
            </h2>

            <Link
              href="/phim-moi-cap-nhat"
              className="text-sm font-medium text-red-500 hover:text-red-400"
            >
              Xem tất cả →
            </Link>
          </div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {latestMovies.map((movie) => (
              <MovieCard key={movie._id}
                movie={movie}
                className="latest-movie"
              />
            ))}

          </div>
        </div>
      </section>
      <MovieSection title="🇨🇳 Phim Trung Quốc"

        href="/quoc-gia/trung-quoc" movies={chineseMovies} />
      <MovieSection title="🇰🇷 Phim Hàn Quốc"

        href="/quoc-gia/han-quoc" movies={koreanMovies} />
      <MovieSection title="🇯🇵 Phim Nhật Bản"

        href="/quoc-gia/nhat-ban" movies={japaneseMovies} />
    </>
  )
}