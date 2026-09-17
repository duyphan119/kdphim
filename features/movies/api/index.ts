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
  "nhat-au-xuan",
  "dau-xuan-tuoi-sang",
  "bay-vao-trai-tim-anh-bay-vao-tim-anh",
  "lan-huong-nhu-co",
  "mac-ly",
  "pha-ken-2025",
  "duong-quy-ky-dam",
  "duong-trieu-quy-su-luc",
  "loi-nguyen-dong-cung",
  "co-di-ma-lay-chong-toi-ban-nhat",
  "toi-o-dinh-cao-doi-cau",
  "giai-ngau-thien-thanh",
  "phu-nhan-dai-quan-the-ky-21",
  "khanh-du-nien-phan-2",
  "ho-so-nam-bo",
  "thien-huong",
  "sau-hon-nhan",
  "tram-nam-hoa-hop-uoc-dinh-mot-loi",
  "con-duong-binh-pham",
  "ngoc-minh-tra-cot",
  "nhat-tieu-tuy-ca",
  "gio-nam-hieu-long-toi",
  "khanh-khanh-nga-tam",
  "dung-rung-dong-vi-anh",
  "gieo-hong-dau-noi-duoi-may-nang",
  "nhat-niem-so-kien-cam-y-dao",
  "tinh-yeu-co-phao-hoa",
  "toi-ac-ngo-ngan-toi-pham-iq-thap",
  "rat-nho-rat-nho-anh",
  "luu-thuy-dieu-dieu",
  "tan-len-nham-kieu-hoa-duoc-chong-nhu-y-kieu-hoa-hi-su",
  "sau-hon-nhan",
  "tang-hai-truyen",
  "chi-la-quan-he-hon-nhan",
  "ho-tam",
  "tieng-yeu-nay-anh-dich-duoc-khong",
  "giac-mo-nguoi-luat-su",
  "chuyen-tinh-ma-quai",
  "ke-thu-hoang-gia-cua-toi",
  "su-huynh-qua-can-trong",
  "chang-thu-ky-hoan-hao",
  "thieu-nien-babylon",
  "thanh-xuan-cua-toi",
  "anh-cung-co-ngay-nay",
  "kieu-so",
  "phuong-hoang-dai-thuong",
  "duong-cung-ky-an-thanh-vu-phong-minh",
  "quan-trang-than-yeu",
  "em-la-niem-kieu-hanh-cua-anh",
  "con-ra-the-thong-gi-nua",
  "vu-lam-linh",
  "nguoi-lam-an-lon",
  "co-chau",
  "nguyet-lan-y-ky",
  "hoa-gian-lenh",
  "than-den-oi-uoc-di",
  "luong-ngon-ta-y",
  "dau-la-dai-luc-nhien-hon-chien",
  "thien-thu-lenh",
  "gia-tri-tuyet-doi-cua-lang-man",
  "phi-vu-chung-cu",
  "xin-chao-1983",
  "thien-doa-dao-hoa-nhat-the-khai",
  "mot-tinh-yeu-bat-ngo-den",
  "song-trang-hoan-menh",
  "con-say-mua-xuan",
  "dem-nguoc-noi-yeu-em",
  "doan-xem-toi-la-ai",
  "tu-da-quy",
  "luat-su-cong-ich",
  "khanh-du-nien-phan-1",
  "luu-ly-my-nhan-sat",
  "trieu-tuyet-luc",
  "nhat-kien-khuynh-tam",
  "khoi-lua-nhan-gian-cua-toi",
  "ngu-dinh-dao",
  "keo-ngot-tinh-yeu",
  "tieu-nhan-phan-2",
  "xung-dang-de-yeu",
  "bach-nguyet-phan-tinh",
  "dai-mong-quy-ly",
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
    const LATEST_ITEMS_LENGTH = 24;

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

    const date = new Date();

    const day = date.getDay();

    const response = await Promise.allSettled([
      getDetailsBySlug(banners[day]),
      Promise.allSettled(
        hotSlugs
          .filter(
            (slug) =>
              chineseMovies.findIndex((item) => item.slug === slug) === -1 &&
              koreanMovies.findIndex((item) => item.slug === slug) === -1,
          )
          .map((slug) => getDetailsBySlug(slug)),
      ),
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
      chineseMovies: chineseMovies.slice(
        LATEST_ITEMS_LENGTH / 2,
        LATEST_ITEMS_LENGTH * 2,
      ),
      koreanMovies: koreanMovies.slice(
        LATEST_ITEMS_LENGTH / 2,
        LATEST_ITEMS_LENGTH * 2,
      ),
      hotMovies,
      latestMovies,
    };
  },
};
