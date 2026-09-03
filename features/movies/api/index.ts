import { categoriesApi } from "@/features/categories/api";
import { countriesApi } from "@/features/countries/api";
import { API_DOMAIN } from "@/lib/constants";
import { shuffleArray } from "@/lib/utils";
import qs from "query-string";

const banners = [
  "thien-huong",
  "cho-hoang-va-xuong",
  "bach-nguyet-phan-tinh",
  "tang-hai-truyen",
  "trieu-tuyet-luc",
  "tu-da-quy",
  "rat-nho-rat-nho-anh",
];

const hotSlugs = shuffleArray([
  "ho-so-nam-bo",
  "thien-doa-dao-hoa-nhat-the-khai",
  "ho-tam",
  "tang-hai-truyen",
  "chang-thu-ky-hoan-hao",
  "khoi-lua-nhan-gian-cua-toi",
  "phuong-hoang-dai-thuong",
  "xung-dang-de-yeu",
  "hoa-gian-lenh",
  "kieu-so",
  "co-di-ma-lay-chong-toi-ban-nhat",
  "thieu-nien-babylon",
  "chi-la-quan-he-hon-nhan",
  "dem-nguoc-noi-yeu-em",
  "con-say-mua-xuan",
  "keo-ngot-tinh-yeu",
  "khanh-du-nien-phan-2",
  "vu-lam-linh",
  "sau-hon-nhan",
  "chuyen-tinh-ma-quai",
  "nguoi-lam-an-lon",
  "luu-ly-my-nhan-sat",
  "duong-cung-ky-an-thanh-vu-phong-minh",
  "quan-trang-than-yeu",
  "giai-ngau-thien-thanh",
  "than-den-oi-uoc-di",
  "tinh-yeu-co-phao-hoa",
  "co-chau",
  "phu-nhan-dai-quan-the-ky-21",
  "phi-vu-chung-cu",
  "gieo-hong-dau-noi-duoi-may-nang",
  "dai-mong-quy-ly",
  "tieu-nhan-phan-2",
  "tu-da-quy",
  "luong-ngon-ta-y",
  "pha-ken-2025",
  "tan-len-nham-kieu-hoa-duoc-chong-nhu-y-kieu-hoa-hi-su",
  "con-duong-binh-pham",
  "nguyet-lan-y-ky",
  "xin-chao-1983",
  "rat-nho-rat-nho-anh",
  "doan-xem-toi-la-ai",
  "con-ra-the-thong-gi-nua",
  "thien-thu-lenh",
  "anh-cung-co-ngay-nay",
  "nhat-tieu-tuy-ca",
  "loi-nguyen-dong-cung",
  "khanh-du-nien-phan-1",
  "ngoc-minh-tra-cot",
  "nhat-kien-khuynh-tam",
  "giac-mo-nguoi-luat-su",
  "trieu-tuyet-luc",
  "tram-nam-hoa-hop-uoc-dinh-mot-loi",
  "gia-tri-tuyet-doi-cua-lang-man",
  "ke-thu-hoang-gia-cua-toi",
  "tieng-yeu-nay-anh-dich-duoc-khong",
  "sau-hon-nhan",
  "dung-rung-dong-vi-anh",
  "ngu-dinh-dao",
  "gio-nam-hieu-long-toi",
  "luat-su-cong-ich",
  "em-la-niem-kieu-hanh-cua-anh",
  "khanh-khanh-nga-tam",
  "nhat-niem-so-kien-cam-y-dao",
  "mac-ly",
  "bach-nguyet-phan-tinh",
  "mot-tinh-yeu-bat-ngo-den",
  "dau-la-dai-luc-nhien-hon-chien",
  "thien-huong",
  "thanh-xuan-cua-toi",
  "luu-thuy-dieu-dieu",
  "toi-ac-ngo-ngan-toi-pham-iq-thap",
  "toi-o-dinh-cao-doi-cau",
  "duong-trieu-quy-su-luc",
  "song-trang-hoan-menh",
  "duong-quy-ky-dam",
]);

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
    const slugs = hotSlugs.slice((page - 1) * limit, page * limit);

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
        totalPages: Math.ceil(hotSlugs.length / limit),
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
    const countries = ["trung-quoc", "han-quoc", "nhat-ban"];
    const ITEMS_PER_SECTION = 24;
    let latestItems =
      (await getLatest({ page: 1 }))?.items?.filter((item) =>
        countries.includes(item.country[0].slug),
      ) || [];

    if (latestItems.length < ITEMS_PER_SECTION) {
      latestItems = latestItems.concat(
        (await getLatest({ page: 2 }))?.items
          ?.filter((item) => countries.includes(item.country[0].slug))
          .slice(0, ITEMS_PER_SECTION - latestItems.length) || [],
      );
    }

    let excludeIds = latestItems.map((item) => item._id);

    let chineseMovies =
      (await countriesApi.movies("trung-quoc", { limit: "48" }))?.items
        ?.filter(
          (item) =>
            countries.includes(item.country[0].slug) &&
            !hotSlugs.includes(item.slug) &&
            !excludeIds.includes(item._id),
        )
        .slice(0, ITEMS_PER_SECTION) || [];

    let koreanMovies =
      (await countriesApi.movies("han-quoc", { limit: "48" }))?.items
        ?.filter(
          (item) =>
            countries.includes(item.country[0].slug) &&
            !hotSlugs.includes(item.slug) &&
            !excludeIds.includes(item._id),
        )
        .slice(0, ITEMS_PER_SECTION) || [];

    let japaneseMovies =
      (await countriesApi.movies("nhat-ban", { limit: "48" }))?.items
        ?.filter(
          (item) =>
            countries.includes(item.country[0].slug) &&
            !hotSlugs.includes(item.slug) &&
            !excludeIds.includes(item._id),
        )
        .slice(0, ITEMS_PER_SECTION) || [];

    excludeIds = [
      ...excludeIds,
      ...chineseMovies.map(({ _id }) => _id),
      ...koreanMovies.map(({ _id }) => _id),
      ...japaneseMovies.map(({ _id }) => _id),
    ];

    const schoolMovies =
      (await categoriesApi.movies("hoc-duong", { limit: "48" }))?.items?.filter(
        (item) =>
          countries.includes(item.country[0].slug) &&
          !hotSlugs.includes(item.slug) &&
          !excludeIds.includes(item._id),
      ) || [];

    const romanceMovies =
      (await categoriesApi.movies("hoc-duong", { limit: "48" }))?.items?.filter(
        (item) =>
          countries.includes(item.country[0].slug) &&
          !hotSlugs.includes(item.slug) &&
          !excludeIds.includes(item._id),
      ) || [];

    const historicalMovies =
      (await categoriesApi.movies("co-trang", { limit: "48" }))?.items?.filter(
        (item) =>
          countries.includes(item.country[0].slug) &&
          !hotSlugs.includes(item.slug) &&
          !excludeIds.includes(item._id),
      ) || [];

    const date = new Date();

    const day = date.getDay();

    const response = await Promise.allSettled([
      getDetailsBySlug(banners[day]),
      Promise.allSettled(hotSlugs.map((slug) => getDetailsBySlug(slug))),
    ]);

    const data = response.map((item) =>
      item.status === "fulfilled" ? item.value : null,
    );

    const hotMovies: T_Movie[] = (data[1] as any)
      .map((item: any) =>
        item.status === "fulfilled" ? item.value.movie : null,
      )
      .slice(0, 24);

    return {
      bannerMovie:
        (data[0] as { movie: T_Movie; episodes: T_Episode[] }) || null,
      chineseMovies,
      koreanMovies,
      japaneseMovies,
      historicalMovies,
      schoolMovies,
      romanceMovies,
      hotMovies,
      latestMovies: latestItems,
    };
  },
};
