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
  "thien-huong",
  "loi-nguyen-dong-cung",
  "tinh-yeu-co-phao-hoa",
  "vu-lam-linh",
  "ho-tam",
  "mot-tinh-yeu-bat-ngo-den",
  "nhat-niem-so-kien-cam-y-dao",
  "co-di-ma-lay-chong-toi-ban-nhat",
  "luu-thuy-dieu-dieu",
  "kieu-so",
  "gieo-hong-dau-noi-duoi-may-nang",
  "tram-nam-hoa-hop-uoc-dinh-mot-loi",
  "ngu-dinh-dao",
  "anh-cung-co-ngay-nay",
  "em-la-niem-kieu-hanh-cua-anh",
  "mac-ly",
  "luu-ly-my-nhan-sat",
  "song-trang-hoan-menh",
  "rat-nho-rat-nho-anh",
  "duong-cung-ky-an-thanh-vu-phong-minh",
  "dai-mong-quy-ly",
  "nguyet-lan-y-ky",
  "sau-hon-nhan",
  "con-say-mua-xuan",
  "thieu-nien-babylon",
  "ho-so-nam-bo",
  "duong-quy-ky-dam",
  "duong-trieu-quy-su-luc",
  "xung-dang-de-yeu",
  "con-ra-the-thong-gi-nua",
  "con-duong-binh-pham",
  "khoi-lua-nhan-gian-cua-toi",
  "gio-nam-hieu-long-toi",
  "xin-chao-1983",
  "nhat-tieu-tuy-ca",
  "ke-thu-hoang-gia-cua-toi",
  "tieu-nhan-phan-2",
  "luong-ngon-ta-y",
  "tan-len-nham-kieu-hoa-duoc-chong-nhu-y-kieu-hoa-hi-su",
  "phi-vu-chung-cu",
  "gia-tri-tuyet-doi-cua-lang-man",
  "tu-da-quy",
  "toi-ac-ngo-ngan-toi-pham-iq-thap",
  "dung-rung-dong-vi-anh",
  "pha-ken-2025",
  "khanh-du-nien-phan-1",
  "giac-mo-nguoi-luat-su",
  "chi-la-quan-he-hon-nhan",
  "thien-thu-lenh",
  "dem-nguoc-noi-yeu-em",
  "khanh-khanh-nga-tam",
  "tang-hai-truyen",
  "toi-o-dinh-cao-doi-cau",
  "nguoi-lam-an-lon",
  "giai-ngau-thien-thanh",
  "chang-thu-ky-hoan-hao",
  "ngoc-minh-tra-cot",
  "sau-hon-nhan",
  "chuyen-tinh-ma-quai",
  "thien-doa-dao-hoa-nhat-the-khai",
  "than-den-oi-uoc-di",
  "trieu-tuyet-luc",
  "dau-la-dai-luc-nhien-hon-chien",
  "phuong-hoang-dai-thuong",
  "bach-nguyet-phan-tinh",
  "luat-su-cong-ich",
  "quan-trang-than-yeu",
  "co-chau",
  "keo-ngot-tinh-yeu",
  "thanh-xuan-cua-toi",
  "phu-nhan-dai-quan-the-ky-21",
  "khanh-du-nien-phan-2",
  "hoa-gian-lenh",
  "nhat-kien-khuynh-tam",
  "tieng-yeu-nay-anh-dich-duoc-khong",
  "doan-xem-toi-la-ai",
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
    const date = new Date();

    const day = date.getDay();

    const response = await Promise.allSettled([
      getDetailsBySlug(banners[day]),
      countriesApi.movies("trung-quoc", { limit: "48" }),
      countriesApi.movies("han-quoc", { limit: "48" }),
      countriesApi.movies("nhat-ban", { limit: "48" }),
      categoriesApi.movies("co-trang", {
        limit: "48",
        country: "trung-quoc,han-quoc,nhat-ban",
      }),
      categoriesApi.movies("hoc-duong", {
        limit: "48",
        country: "trung-quoc,han-quoc,nhat-ban",
      }),
      categoriesApi.movies("tinh-cam", {
        limit: "48",
        country: "trung-quoc,han-quoc,nhat-ban",
      }),
      Promise.allSettled(hotSlugs.map((slug) => getDetailsBySlug(slug))),
      getLatest(),
    ]);

    const data = response.map((item) =>
      item.status === "fulfilled" ? item.value : null,
    );

    let excludeSlugs = [banners[day], ...hotSlugs];

    const latestMovies = (((data[8] as any)?.items || []) as T_Movie[]).slice(
      0,
      24,
    );

    excludeSlugs = excludeSlugs.concat(latestMovies.map(({ slug }) => slug));

    const items1 = ((data[1] as { items: T_Movie[] })?.items || []).filter(
      ({ slug }) => excludeSlugs.findIndex((item) => item === slug) === -1,
    );
    const items2 = ((data[2] as { items: T_Movie[] })?.items || []).filter(
      ({ slug }) => excludeSlugs.findIndex((item) => item === slug) === -1,
    );
    const items3 = ((data[3] as { items: T_Movie[] })?.items || []).filter(
      ({ slug }) => excludeSlugs.findIndex((item) => item === slug) === -1,
    );

    let excludeIds = [
      ...items1.map(({ _id }) => _id),
      ...items2.map(({ _id }) => _id),
      ...items3.map(({ _id }) => _id),
      ...latestMovies.map(({ _id }) => _id),
    ];

    const noContain = (item: T_Movie, ids: string[]) =>
      ids.findIndex((_id) => _id === item._id) === -1;

    const items4 = ((data[4] as { items: T_Movie[] })?.items || []).filter(
      (item) => noContain(item, excludeIds),
    );
    excludeIds = excludeIds.concat(items4.map(({ _id }) => _id));
    const items5 = ((data[5] as { items: T_Movie[] })?.items || []).filter(
      (item) =>
        noContain(item, excludeIds.concat(items4.map(({ _id }) => _id))),
    );
    excludeIds = excludeIds.concat(items5.map(({ _id }) => _id));
    const items6 = ((data[6] as { items: T_Movie[] })?.items || []).filter(
      (item) => noContain(item, excludeIds),
    );

    const hotMovies: T_Movie[] = (data[7] as any)
      .map((item: any) =>
        item.status === "fulfilled" ? item.value.movie : null,
      )
      .slice(0, 24);

    return {
      bannerMovie:
        (data[0] as { movie: T_Movie; episodes: T_Episode[] }) || null,
      chineseMovies: items1.slice(0, 24),
      koreanMovies: items2.slice(0, 24),
      japaneseMovies: items3.slice(0, 24),
      historicalMovies: items4.slice(0, 24),
      schoolMovies: items5.slice(0, 24),
      romanceMovies: items6.slice(0, 24),
      hotMovies,
      latestMovies,
    };
  },
};
