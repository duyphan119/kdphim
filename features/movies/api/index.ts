import { countriesApi } from "@/features/countries/api";
import { API_DOMAIN, FEATURED_SLUG, HOT_SLUGS } from "@/lib/constants";
import qs from "query-string";

const getDetailsBySlug = async (
  slug: string,
): Promise<{ movie: T_Movie; episodes: T_Episode[] } | null> => {
  try {
    const response = await fetch(`${API_DOMAIN}/phim/${slug}`, {
      next: {
        revalidate: 30,
      },
    });

    const json = await response.json();

    if (json.movie) {
      return {
        movie: json.movie,
        episodes: json.episodes || [],
      };
    }
  } catch (error) {
    console.log("moviesApi,getDetailsBySlug,error", error);
  }

  return null;
};

const getDetailsByTmdb = async (
  id: number,
  type: "movie" | "tv",
): Promise<{ movie: T_Movie; episodes: T_Episode[] } | null> => {
  try {
    const response = await fetch(`${API_DOMAIN}/tmdb/${type}/${id}`, {
      next: {
        revalidate: 30,
      },
    });

    const json = await response.json();

    if (json.movie) {
      return {
        movie: json.movie,
        episodes: json.episodes || [],
      };
    }
  } catch (error) {
    console.log("moviesApi,getDetailsBySlug,error", error);
  }

  return null;
};

const getLatest = async (filter?: {
  page?: number;
}): Promise<{
  seoOnPage: T_SeoOnPage;
  breadCrumb: T_BreadcrumbItem[];
  params: T_Params;
  items: T_Movie[];
} | null> => {
  try {
    const response = await fetch(
      `${API_DOMAIN}/v1/api/home?${qs.stringify(filter || { page: 1 })}`,
      {
        next: {
          revalidate: 30,
        },
      },
    );

    const json = await response.json();

    if (json.data) {
      return json.data || null;
    }
  } catch (error) {
    console.log("moviesApi,getLatest,error", error);
  }

  return null;
};

const search = async (
  keyword: string,
  filter?: T_Filter,
): Promise<{
  seoOnPage: T_SeoOnPage;
  breadCrumb: T_BreadcrumbItem[];
  params: T_Params;
  items: T_Movie[];
  titlePage: string;
} | null> => {
  try {
    const response = await fetch(
      `${API_DOMAIN}/v1/api/tim-kiem?${qs.stringify({
        keyword,
        ...filter,
      })}`,
      {
        next: {
          revalidate: 30,
        },
      },
    );

    const json = await response.json();

    if (json.data) {
      return json.data;
    }
  } catch (error) {
    console.log("categoriesApi,movies,error", error);
  }

  return null;
};

const getHotMovies = async (filter?: { page?: number; limit?: number }) => {
  const page = Number(filter?.page) || 1;
  const limit = Number(filter?.limit) || 6;

  try {
    const slugs = HOT_SLUGS.slice((page - 1) * limit, page * limit);

    const response = await Promise.allSettled(
      slugs.map((slug) => getDetailsBySlug(slug)),
    );

    const movies = response
      .map((item) => (item.status === "fulfilled" ? item.value?.movie : null))
      .filter((item) => (item ? true : false)) as T_Movie[];

    return {
      items: movies,
      pagination: {
        totalItems: movies.length,
        totalItemsPerPage: limit,
        currentPage: page,
        totalPages: Math.ceil(HOT_SLUGS.length / limit),
      },
    };
  } catch (error) {
    console.log("moviesApi,getHotMovies,error", error);
  }

  return null;
};

const getRelated = async ({
  categorySlug,
  countrySlug,
  currentSlug,
}: {
  countrySlug: string;
  categorySlug: string[];
  currentSlug: string;
}) => {
  try {
    const data = await countriesApi.movies(countrySlug, {
      category: categorySlug.join(","),
      limit: "25",
    });

    if (data) {
      return data.items
        .filter((item) => item.slug !== currentSlug)
        .slice(0, 24);
    }
  } catch (error) {}

  return [];
};
export const moviesApi = {
  detailsBySlug: getDetailsBySlug,
  detailsByTmdb: getDetailsByTmdb,
  latest: getLatest,
  hot: getHotMovies,
  related: getRelated,
  search,
  home: async () => {
    const LATEST_ITEMS_LENGTH = 6;
    const ITEMS_PER_ROW = 6;

    let { items: chineseMovies } = (await countriesApi.movies("trung-quoc", {
      limit: String(LATEST_ITEMS_LENGTH * 2),
    })) || { items: [] };

    let { items: koreanMovies } = (await countriesApi.movies("han-quoc", {
      limit: String(LATEST_ITEMS_LENGTH * 2),
    })) || { items: [] };

    const latestMovies = [
      ...chineseMovies.slice(0, LATEST_ITEMS_LENGTH / 2),
      ...koreanMovies.slice(0, LATEST_ITEMS_LENGTH / 2),
    ].sort(
      (a, b) =>
        new Date(b.modified.time).getTime() -
        new Date(a.modified.time).getTime(),
    );

    const response = await Promise.allSettled([
      getDetailsBySlug(FEATURED_SLUG),
      Promise.allSettled(
        HOT_SLUGS.filter(
          (slug) =>
            chineseMovies.findIndex((item) => item.slug === slug) === -1 &&
            koreanMovies.findIndex((item) => item.slug === slug) === -1,
        ).map((slug) => getDetailsBySlug(slug)),
      ),
    ]);

    const data = response.map((item) =>
      item.status === "fulfilled" ? item.value : null,
    );

    const hotMovies: T_Movie[] = (data[1] as any)
      .map((item: any) =>
        item.status === "fulfilled" ? item.value?.movie || null : null,
      )
      .slice(0, LATEST_ITEMS_LENGTH);

    return {
      bannerMovie:
        (data[0] as { movie: T_Movie; episodes: T_Episode[] }) || null,
      chineseMovies: chineseMovies.slice(
        LATEST_ITEMS_LENGTH / 2,
        LATEST_ITEMS_LENGTH / 2 + ITEMS_PER_ROW,
      ),
      koreanMovies: koreanMovies.slice(
        LATEST_ITEMS_LENGTH / 2,
        LATEST_ITEMS_LENGTH / 2 + ITEMS_PER_ROW,
      ),
      hotMovies,
      latestMovies,
    };
  },
};
