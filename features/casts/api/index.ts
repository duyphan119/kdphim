import { countriesApi } from "@/features/countries/api";
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
      let newTmdbId = tmdb_id;
      if (!tmdb_id) {
        const countriesInTmdb = await countriesApi.itemsInTmdb();

        console.log({ countriesInTmdb });

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

        console.log({ newJsonData });

        const { results } = newJsonData;

        const index = results.findIndex(
          (item: any) =>
            item.name === options.keyword &&
            isEqualArray(
              item.origin_country,
              countries && item.first_air_date.startsWith(options.year + ""),
            ),
        );

        if (index !== -1) {
          newTmdbId = results[index].id;
        }
      }
      console.log({ peoples, newTmdbId });
      if (peoples.length === 0 && newTmdbId) {
        const newPeoples = await getCastsByTmdb(
          newTmdbId,
          options.type === "series" ? "tv" : "movie",
        );
        console.log({ newPeoples });
        return {
          ...json.data,
          peoples: newPeoples,
        };
      }
      return json.data;
    }
  } catch (error) {
    console.log("castsApi,getCastsByVideoSlug,error", error);
  }

  return null;
};

export const castsApi = {
  casts: getCastsByVideoSlug,
};
