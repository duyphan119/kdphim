

import WatchedMoviesPage from "@/features/watched-movies/pages/watched-movies";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{ page: string }>;
};

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  const awaitedSearchParams = await searchParams;
  const currentPage = Number(awaitedSearchParams.page) || 1;

  return {
    title: `KDPhim | Phim đã xem${currentPage === 1 ? "" : " | Trang " + currentPage}`,
    description: "Danh sách phim đã xem",
  };
};

export default async function Page({ searchParams }: Props) {
  const awaitedSearchParams = await searchParams;

  return (
    <WatchedMoviesPage searchParams={awaitedSearchParams} />
  );
}
