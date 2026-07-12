import Breadcrumb from "@/components/breadcrumb";
import { moviesApi } from "@/features/movies/api";
import MovieCard from "@/features/movies/components/movie-card";
import MoviesPagination from "@/features/movies/components/movies-pagination";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  searchParams: Promise<{ page: string }>;
};

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  const awaitedSearchParams = await searchParams;
  const currentPage = Number(awaitedSearchParams.page) || 1;

  return {
    title: `KDPhim | Phim hot${currentPage === 1 ? "" : " | Trang " + currentPage}`,
    description: "Danh sách phim KDPhim đề xuất",
  };
};

export default async function Page({ searchParams }: Props) {
  const awaitedSearchParams = await searchParams;

  const currentPage = Number(awaitedSearchParams.page) || 1;
  const limit = 20;

  const data = await moviesApi.hot({ limit, page: currentPage })

  if (!data) return notFound();

  return (
    <div className="container mx-auto space-y-4 p-4">
      <Breadcrumb
        items={[
          {
            name: "Phim hot - Trang " + currentPage,
            position: 1,
            isCurrent: true,
          },
        ]}
      />
      <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.items.map((item, index) => (
          <div key={index} className="col-span-1">
            <MovieCard movie={item} />
          </div>
        ))}
      </div>
      <MoviesPagination
        pagination={data.pagination}
      />
    </div>
  );
}
