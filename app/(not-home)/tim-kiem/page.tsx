import Breadcrumb from "@/components/breadcrumb";
import { categoriesApi } from "@/features/categories/api";
import { countriesApi } from "@/features/countries/api";
import { moviesApi } from "@/features/movies/api";
import MovieCard from "@/features/movies/components/movie-card";
import MoviesFilter from "@/features/movies/components/movies-filter";
import MoviesPagination from "@/features/movies/components/movies-pagination";
import { Clapperboard } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<T_Filter & { keyword: string }>;
};

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  const awaitedSearchParams = await searchParams;

  const { keyword, ...otherParams } = awaitedSearchParams;

  const data = await moviesApi.search(keyword, otherParams);
  if (!data || !data.seoOnPage) return {
    title: "KDPhim | Tìm kiếm",
    description: "Kết quả tìm kiếm",
  }
  return {
    title: `KDPhim | ${data.seoOnPage.titleHead}`,
    description: data.seoOnPage.descriptionHead,
  };
};

export default async function Page({ searchParams }: Props) {
  const awaitedSearchParams = await searchParams;

  const { keyword, ...otherParams } = awaitedSearchParams;


  const [movieData, categoriesData, countriesData] = await Promise.allSettled([
    moviesApi.search(keyword, otherParams),
    categoriesApi.items(),
    countriesApi.items()
  ]);


  if (movieData.status === 'rejected' || !movieData.value) return <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 px-6 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
      <HugeiconsIcon icon={Clapperboard} className="h-8 w-8 text-muted-foreground" />
    </div>

    <h3 className="mt-5 text-xl font-bold">
      Không tìm thấy phim
    </h3>

    <p className="mt-2 max-w-md text-sm text-muted-foreground">
      Rất tiếc, chúng tôi không tìm thấy bộ phim nào phù hợp.
      Hãy thử tìm kiếm với từ khóa khác.
    </p>
  </div>
  else {
    const { breadCrumb, items, params: apiParams } = movieData.value
    const categories = categoriesData.status === 'fulfilled' ? categoriesData.value : [];
    const countries = countriesData.status === 'fulfilled' ? countriesData.value : [];
    return (
      <div className="container space-y-4 p-4">
        <Breadcrumb items={breadCrumb} />

        <div className="">
          <MoviesFilter
            defaultParams={awaitedSearchParams}
            isSearchFilter={true}
            categories={categories}
            countries={countries}
          />
        </div>

        <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items?.map((videoItem) => (
            <div key={videoItem._id} className="col-span-1">
              <MovieCard
                movie={videoItem}
              />
            </div>
          ))}
        </div>

        <div className="">
          <MoviesPagination
            pagination={apiParams.pagination}
            searchParams={awaitedSearchParams}
          />
        </div>
      </div>
    );
  }
}
