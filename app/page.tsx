

import { moviesApi } from "@/features/movies/api";
import HeroBanner from "@/features/movies/components/hero-banner";
import MovieCard from "@/features/movies/components/movie-card";
import MovieSection from "@/features/movies/components/movie-section";
import HomeWatchedMovies from "@/features/watched-movies/components/home-watched-movies";
import { hotCasts, TMDB_IMAGE_DOMAIN } from "@/lib/constants";
import { Female02Icon, Male02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";


export default async function Page() {
  const { bannerMovie, hotMovies, latestMovies, chineseMovies, koreanMovies, japaneseMovies, historicalMovies, romanceMovies, schoolMovies } = await moviesApi.home();


  return (
    <>
      {bannerMovie ? <HeroBanner movie={bannerMovie.movie} episodes={bannerMovie.episodes} /> : null}
      <HomeWatchedMovies />
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
      <MovieSection title="🇨🇳 Phim Trung Quốc"
        href="/quoc-gia/trung-quoc" movies={chineseMovies} />
      <MovieSection title="🇰🇷 Phim Hàn Quốc"
        href="/quoc-gia/han-quoc" movies={koreanMovies} />
      <MovieSection title="🇯🇵 Phim Nhật Bản"
        href="/quoc-gia/nhat-ban" movies={japaneseMovies} />
      <MovieSection title="Phim tình cảm"
        href="/quoc-gia/nhat-ban" movies={romanceMovies} />
      <MovieSection title="Phim cổ trang"
        href="/quoc-gia/nhat-ban" movies={historicalMovies} />
      <MovieSection title="Phim học đường"
        href="/quoc-gia/nhat-ban" movies={schoolMovies} />
      <section className="bg-zinc-950 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-black text-white">
            Diễn viên nổi bật
          </h2>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {hotCasts.map((item) => (
              <Link key={item.id} href={`/dien-vien/${item.id}`} className="relative block aspect-[2/3] group overflow-hidden rounded-md">
                <Image
                  src={`${TMDB_IMAGE_DOMAIN}/t/p/w300${item.profile_path}`}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw,
                    (max-width: 1024px) 33vw,
                    (max-width: 1280px) 20vw,
                    16vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                  loading="eager"
                />

                <div className="absolute inset-x-4 bottom-4 text-sm rounded-md bg-black/80 px-2 py-1.5 flex items-center gap-1">
                  <HugeiconsIcon icon={item.gender === 1 ? Female02Icon : Male02Icon} size={16} />
                  <span>{item.name}</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}