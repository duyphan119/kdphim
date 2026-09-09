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
  "tan-len-nham-kieu-hoa-duoc-chong-nhu-y-kieu-hoa-hi-su",
  "gio-nam-hieu-long-toi",
  "kieu-so",
  "ngu-dinh-dao",
  "tang-hai-truyen",
  "khoi-lua-nhan-gian-cua-toi",
  "xin-chao-1983",
  "trieu-tuyet-luc",
  "phi-vu-chung-cu",
  "sau-hon-nhan",
  "luu-thuy-dieu-dieu",
  "khanh-du-nien-phan-1",
  "ho-so-nam-bo",
  "luong-ngon-ta-y",
  "chuyen-tinh-ma-quai",
  "em-la-niem-kieu-hanh-cua-anh",
  "dai-mong-quy-ly",
  "bay-vao-trai-tim-anh-bay-vao-tim-anh",
  "su-huynh-qua-can-trong",
  "chang-thu-ky-hoan-hao",
  "con-say-mua-xuan",
  "duong-quy-ky-dam",
  "than-den-oi-uoc-di",
  "anh-cung-co-ngay-nay",
  "tieu-nhan-phan-2",
  "dau-la-dai-luc-nhien-hon-chien",
  "bach-nguyet-phan-tinh",
  "thanh-xuan-cua-toi",
  "xung-dang-de-yeu",
  "ho-tam",
  "toi-o-dinh-cao-doi-cau",
  "nhat-niem-so-kien-cam-y-dao",
  "tieng-yeu-nay-anh-dich-duoc-khong",
  "co-di-ma-lay-chong-toi-ban-nhat",
  "thieu-nien-babylon",
  "loi-nguyen-dong-cung",
  "quan-trang-than-yeu",
  "tram-nam-hoa-hop-uoc-dinh-mot-loi",
  "duong-trieu-quy-su-luc",
  "thien-thu-lenh",
  "dem-nguoc-noi-yeu-em",
  "luu-ly-my-nhan-sat",
  "hoa-gian-lenh",
  "nguyet-lan-y-ky",
  "doan-xem-toi-la-ai",
  "con-duong-binh-pham",
  "nhat-tieu-tuy-ca",
  "phuong-hoang-dai-thuong",
  "con-ra-the-thong-gi-nua",
  "luat-su-cong-ich",
  "khanh-du-nien-phan-2",
  "thien-huong",
  "ke-thu-hoang-gia-cua-toi",
  "song-trang-hoan-menh",
  "giac-mo-nguoi-luat-su",
  "mot-tinh-yeu-bat-ngo-den",
  "ngoc-minh-tra-cot",
  "mac-ly",
  "gia-tri-tuyet-doi-cua-lang-man",
  "dung-rung-dong-vi-anh",
  "pha-ken-2025",
  "tu-da-quy",
  "duong-cung-ky-an-thanh-vu-phong-minh",
  "nguoi-lam-an-lon",
  "co-chau",
  "nhat-kien-khuynh-tam",
  "vu-lam-linh",
  "phu-nhan-dai-quan-the-ky-21",
  "rat-nho-rat-nho-anh",
  "sau-hon-nhan",
  "tinh-yeu-co-phao-hoa",
  "giai-ngau-thien-thanh",
  "thien-doa-dao-hoa-nhat-the-khai",
  "gieo-hong-dau-noi-duoi-may-nang",
  "toi-ac-ngo-ngan-toi-pham-iq-thap",
  "chi-la-quan-he-hon-nhan",
  "keo-ngot-tinh-yeu",
  "khanh-khanh-nga-tam",
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
    const countries = ["trung-quoc", "han-quoc"];
    const LATEST_ITEMS_LENGTH = 24;
    let latestItems =
      (await getLatest({ page: 1 }))?.items?.filter((item) =>
        countries.includes(item.country[0].slug),
      ) || [];

    while (latestItems.length < LATEST_ITEMS_LENGTH) {
      latestItems = latestItems.concat(
        (await getLatest({ page: 2 }))?.items
          ?.filter((item) => countries.includes(item.country[0].slug))
          .slice(0, LATEST_ITEMS_LENGTH - latestItems.length) || [],
      );
    }

    let excludeIds = latestItems.map((item) => item._id);

    let chineseMovies =
      (
        await countriesApi.movies("trung-quoc", {
          limit: String(
            LATEST_ITEMS_LENGTH + hotSlugs.length + excludeIds.length,
          ),
        })
      )?.items
        ?.filter(
          (item) =>
            countries.includes(item.country[0].slug) &&
            !hotSlugs.includes(item.slug) &&
            !excludeIds.includes(item._id),
        )
        .slice(0, LATEST_ITEMS_LENGTH) || [];

    let koreanMovies =
      (
        await countriesApi.movies("han-quoc", {
          limit: String(
            LATEST_ITEMS_LENGTH + hotSlugs.length + excludeIds.length,
          ),
        })
      )?.items
        ?.filter(
          (item) =>
            countries.includes(item.country[0].slug) &&
            !hotSlugs.includes(item.slug) &&
            !excludeIds.includes(item._id),
        )
        .slice(0, LATEST_ITEMS_LENGTH) || [];

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
      .slice(0, LATEST_ITEMS_LENGTH);

    return {
      bannerMovie:
        (data[0] as { movie: T_Movie; episodes: T_Episode[] }) || null,
      chineseMovies,
      koreanMovies,
      hotMovies,
      latestMovies: latestItems,
    };
  },
};
