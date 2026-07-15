import { countriesApi } from "@/features/countries/api";
import { moviesApi } from "@/features/movies/api";
import { API_DOMAIN, TMDB_API_DOMAIN, TMDB_API_KEY } from "@/lib/constants";
import { isEqualArray } from "@/lib/utils";
import qs from "query-string";

export type CastsResponse = {
  profile_sizes: {
    h632: string;
    original: string;
    w185: string;
    w45: string;
  };
  peoples: T_People[];
  tmdb_id: number | null;
  tmdb_type: string | null;
  slug: string;
};

const getCastsByTmdb = async (
  tmdbId: number,
  tmdbType: "tv" | "movie",
): Promise<T_People[]> => {
  try {
    const response = await fetch(
      `${TMDB_API_DOMAIN}/${tmdbType}/${tmdbId}/credits?language=vi-VN`,
      {
        headers: {
          Authorization: `Bearer ${TMDB_API_KEY}`,
          accept: "application/json",
        },
      },
    );

    const json = await response.json();

    return json.cast || [];
  } catch (error) {
    console.log("castsApi,getCastByTmdb,error", error);
  }

  return [];
};

const getCastsByVideoSlug = async (
  slug: string,
  options: {
    type: "series" | "single";
    year: number;
    keyword: string;
    countries: T_Country[];
  },
): Promise<CastsResponse | null> => {
  try {
    const response = await fetch(`${API_DOMAIN}/v1/api/phim/${slug}/peoples`);

    const json = await response.json();

    if (json.data) {
      const { peoples, tmdb_id } = json.data as CastsResponse;
      if (peoples.length === 0) {
        const countriesInTmdb = await countriesApi.itemsInTmdb();

        // console.log({ countriesInTmdb });

        const countries = countriesInTmdb
          .filter(
            (item) =>
              options.countries.findIndex(
                ({ name }) => item.native_name === name,
              ) !== -1,
          )
          .map((item) => item.iso_3166_1);

        const newResponse = await fetch(
          `${TMDB_API_DOMAIN}/search/${options.type === "series" ? "tv" : "movie"}?${qs.stringify(
            {
              query: options.keyword,
              language: "vi-VN",
              fir_air_date_year: options.year,
              include_adult: true,
            },
          )}`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_API_KEY}`,
              accept: "application/json",
            },
          },
        );

        const newJsonData = await newResponse.json();

        const { results } = newJsonData;
        console.log({ results });

        const index = results.findIndex(
          (item: any) =>
            item.name === options.keyword &&
            isEqualArray(item.origin_country, countries) &&
            item.first_air_date.startsWith(options.year + ""),
        );

        console.log({ index });

        if (index !== -1) {
          const newPeoples = await getCastsByTmdb(
            results[index].id,
            options.type === "series" ? "tv" : "movie",
          );
          console.log({ newPeoples });
          return {
            ...json.data,
            peoples: newPeoples,
          };
        }
      }
      return json.data;
    }
  } catch (error) {
    console.log("castsApi,getCastsByVideoSlug,error", error);
  }

  return null;
};

const getCastDetails = async (id: string) => {
  try {
    const [
      seriesResponse,
      singleResponse,
      profileResponse,
      countriesInTmdbResponse,
    ] = await Promise.allSettled([
      fetch(`${TMDB_API_DOMAIN}/person/${id}/tv_credits?language=vi-VN`, {
        headers: {
          Authorization: `Bearer ${TMDB_API_KEY}`,
          accept: "application/json",
        },
      }),
      fetch(`${TMDB_API_DOMAIN}/person/${id}/movie_credits?language=vi-VN`, {
        headers: {
          Authorization: `Bearer ${TMDB_API_KEY}`,
          accept: "application/json",
        },
      }),
      fetch(`${TMDB_API_DOMAIN}/person/${id}?language=vi-VN`, {
        headers: {
          Authorization: `Bearer ${TMDB_API_KEY}`,
          accept: "application/json",
        },
      }),
      countriesApi.itemsInTmdb(),
    ]);

    let countriesInTmdb =
      countriesInTmdbResponse.status === "fulfilled"
        ? countriesInTmdbResponse.value
        : [];
    let seriesList: T_Movie[] = [];
    let singleList: T_Movie[] = [];
    let profile: T_CastProfile | null =
      profileResponse.status === "fulfilled"
        ? await profileResponse.value.json()
        : null;

    if (seriesResponse.status === "fulfilled") {
      const value: any = await seriesResponse.value.json();
      const list: T_TvCredit[] = value.cast;

      for (let i = 0; i < list.length; i++) {
        const tmdbItem = list[i];

        // gọi thử api qua tmdb xem có phim không
        const data = await moviesApi.detailsByTmdb(tmdbItem.id, "tv");

        console.log("item tmdb tv", data?.movie.name);
        if (data && data.movie) {
          seriesList.push(data.movie);
          continue;
        }

        const searchData = await moviesApi.search(tmdbItem.name);

        console.log("search tv", searchData);

        if (searchData && searchData.items.length > 0) {
          const resultFind = searchData.items.find(
            (searchItem) =>
              searchItem.name === tmdbItem.name &&
              isEqualArray(
                countriesInTmdb
                  .filter(
                    (item) =>
                      searchItem.country.findIndex(
                        ({ name }) => item.native_name === name,
                      ) !== -1,
                  )
                  .map((item) => item.iso_3166_1),
                tmdbItem.origin_country,
              ) &&
              tmdbItem.first_air_date?.startsWith(searchItem.year + "") &&
              searchItem.type === "series",
          );

          if (resultFind) {
            seriesList.push(resultFind);
            continue;
          }
        }
      }

      if (singleResponse.status === "fulfilled") {
        const value: any = await singleResponse.value.json();
        const list: T_MovieCredit[] = value.cast;

        for (let i = 0; i < list.length; i++) {
          const tmdbItem = list[i];

          // gọi thử api qua tmdb xem có phim không
          const data = await moviesApi.detailsByTmdb(tmdbItem.id, "tv");

          console.log("item tmdb tv", data?.movie.name);
          if (data && data.movie) {
            seriesList.push(data.movie);
            continue;
          }

          const searchData = await moviesApi.search(tmdbItem.title);

          console.log("search tv", searchData);

          if (searchData && searchData.items.length > 0) {
            const resultFind = searchData.items.find(
              (searchItem) =>
                searchItem.name === tmdbItem.title &&
                tmdbItem.release_date?.startsWith(searchItem.year + "") &&
                searchItem.type === "single",
            );

            if (resultFind) {
              seriesList.push(resultFind);
              continue;
            }
          }
        }
      }
    }

    return {
      seriesList,
      singleList,
      profile,
    };
  } catch (error) {
    console.log("castsApi,getCastDetails,error", error);
  }

  return null;
};

export const castsApi = {
  casts: getCastsByVideoSlug,
  details: getCastDetails,
};
