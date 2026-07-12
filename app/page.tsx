

import { moviesApi } from "@/features/movies/api";
import HeroBanner from "@/features/movies/components/hero-banner";
import HotMovies from "@/features/movies/components/hot-movies";
import LatestMovies from "@/features/movies/components/latest-movies";
import MovieSection from "@/features/movies/components/movie-section";


export default async function Page() {
  const { bannerMovie, hotMovies, latestMovies, chineseMovies, koreanMovies, japaneseMovies } = await moviesApi.home();


  return (
    <>
      {bannerMovie ? <HeroBanner movie={bannerMovie.movie} episodes={bannerMovie.episodes} /> : null}
      <HotMovies movies={hotMovies} />
      <LatestMovies movies={latestMovies} />
      <MovieSection title="🇨🇳 Phim Trung Quốc"

        href="/quoc-gia/trung-quoc" movies={chineseMovies} />
      <MovieSection title="🇰🇷 Phim Hàn Quốc"

        href="/quoc-gia/han-quoc" movies={koreanMovies} />
      <MovieSection title="🇯🇵 Phim Nhật Bản"

        href="/quoc-gia/nhat-ban" movies={japaneseMovies} />
    </>
  )
}