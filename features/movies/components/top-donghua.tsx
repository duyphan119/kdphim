import Link from "next/link";
import TopDonghuaCard from "./top-donghua-card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

type TopDonghuaProps = {
  movies: T_Movie[];
}

export default function TopDonghua({ movies }: TopDonghuaProps) {
  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-black text-white">
            Top Donghua
          </h2>

          <Link
            href="/top"
            className="text-sm font-medium text-red-500 hover:text-red-400"
          >
            Xem tất cả →
          </Link>
        </div>

        <Carousel>
          <CarouselContent>
            {movies.map((movie, index) => (
              <CarouselItem key={movie._id} className="basis-1/6">
                <TopDonghuaCard
                  href={`/phim/${movie.slug}`}
                  image={movie.poster_url}
                  title={movie.name}
                  rank={index + 1}
                  className="top-movie"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}