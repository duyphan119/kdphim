import Breadcrumb from "@/components/breadcrumb";
import { categoriesApi } from "@/features/categories/api";

import { countriesApi } from "@/features/countries/api";
import MovieCard from "@/features/movies/components/movie-card";
import MoviesFilter from "@/features/movies/components/movies-filter";
import MoviesPagination from "@/features/movies/components/movies-pagination";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Omit<T_Filter, "type_list" | "country">>;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: Props): Promise<Metadata> => {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  const data = await countriesApi.movies(
    awaitedParams.slug,
    awaitedSearchParams,
  );
  if (!data) return {
    title: `KDPhim | Không tìm thấy`
  }
  return {
    title: `KDPhim | ${data.seoOnPage.titleHead}`,
    description: data.seoOnPage.descriptionHead,
  };
};

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const awaitedSearchParams = await searchParams;

  const [movieData, categoriesData, countriesData] = await Promise.allSettled([
    countriesApi.movies(
      slug,
      awaitedSearchParams,
    ),
    categoriesApi.items(),
    countriesApi.items()
  ]);

  if (movieData.status === 'rejected' || !movieData.value) return notFound()

  const { breadCrumb, items, params: apiParams } = movieData.value
  const categories = categoriesData.status === 'fulfilled' ? categoriesData.value : [];
  const countries = countriesData.status === 'fulfilled' ? countriesData.value : [];

  return (
    <div className="container mx-auto space-y-4 p-4">
      <Breadcrumb items={breadCrumb} />
      <div className="">
        <MoviesFilter
          defaultParams={{
            ...awaitedSearchParams,
            country: slug,
          }}
          categories={categories}
          countries={countries}
        />
      </div>

      <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((item) => (
          <div key={item._id} className="col-span-1">
            <MovieCard
              movie={item}
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
