import { categoriesApi } from "@/features/categories/api";
import { countriesApi } from "@/features/countries/api";
import { API_DOMAIN } from "@/lib/constants";
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

const hot = [
  "pham-nhan-tu-tien-truyen",

  "tang-hai-truyen",

  "mac-vu-van-gian",

  "bach-nguyet-phan-tinh",

  "dai-mong-quy-ly",

  "ngu-phuc-lam-mon",

  "trieu-tuyet-luc",

  "duong-quy-ky-dam",

  "duong-trieu-quy-su-luc",

  "co-chau",

  "hoa-gian-lenh",

  "luu-thuy-dieu-dieu",

  "tu-da-quy",

  "thien-thu-lenh",

  "thien-doa-dao-hoa-nhat-the-khai",

  "ngoc-minh-tra-cot",

  "duong-cung-ky-an-thanh-vu-phong-minh",

  "em-la-niem-kieu-hanh-cua-anh",

  "khoi-lua-nhan-gian-cua-toi",

  "dung-rung-dong-vi-anh",

  "rat-nho-rat-nho-anh",

  "anh-cung-co-ngay-nay",

  "quan-trang-than-yeu",

  "luu-ly-my-nhan-sat",

  "gio-nam-hieu-long-toi",

  "nhat-kien-khuynh-tam",

  "luong-ngon-ta-y",

  "chi-la-quan-he-hon-nhan",

  "khanh-khanh-nga-tam",

  "dau-la-dai-luc-nhien-hon-chien",

  "chang-thu-ky-hoan-hao",

  "luat-su-cong-ich",

  "giac-mo-nguoi-luat-su",

  "nguoi-lam-an-lon",

  "pha-ken-2025",

  "ho-so-nam-bo",

  "con-duong-binh-pham",

  "thieu-nien-babylon",

  "xung-dang-de-yeu",

  "giai-ngau-thien-thanh",

  "mac-ly",

  "kieu-so",

  "nhat-tieu-tuy-ca",

  "phuong-hoang-dai-thuong",

  "nguyet-lan-y-ky",

  "tieu-nhan-phan-2",

  "dac-vu-kim-tai-khoi-dong",

  "thien-huong",

  "vu-lam-linh",

  "co-di-ma-lay-chong-toi-ban-nhat",

  "doan-xem-toi-la-ai",

  "toi-o-dinh-cao-doi-cau",

  "tram-nam-hoa-hop-uoc-dinh-mot-loi",

  "mot-tinh-yeu-bat-ngo-den",

  "dem-nguoc-noi-yeu-em",

  "thanh-xuan-cua-toi",

  "than-den-oi-uoc-di",

  "tieng-yeu-nay-anh-dich-duoc-khong",

  "con-say-mua-xuan",

  "phu-nhan-dai-quan-the-ky-21",

  "ke-thu-hoang-gia-cua-toi",

  "gia-tri-tuyet-doi-cua-lang-man",

  "song-trang-hoan-menh",

  "tinh-yeu-co-phao-hoa",

  "xin-chao-1983",

  "nhat-niem-so-kien-cam-y-dao",
];

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
    const slugs = hot.slice((page - 1) * limit, limit);

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
        totalPages: Math.ceil(hot.length / limit),
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
  latest: getLatest,
  hot: getHotMovies,
  related: getRelated,
  search,
  home: async () => {
    const date = new Date();

    const day = date.getDay();

    const response = await Promise.allSettled([
      getDetailsBySlug(banners[day]),
      countriesApi.movies("trung-quoc", { limit: "36" }),
      countriesApi.movies("han-quoc", { limit: "36" }),
      countriesApi.movies("nhat-ban", { limit: "36" }),
      categoriesApi.movies("co-trang", { limit: "36" }),
      categoriesApi.movies("hoc-duong", { limit: "36" }),
      categoriesApi.movies("tinh-cam", { limit: "36" }),
      Promise.allSettled(hot.map((slug) => getDetailsBySlug(slug))),
      getLatest(),
    ]);

    const data = response.map((item) =>
      item.status === "fulfilled" ? item.value : null,
    );

    let excludeSlugs = [banners[day], ...hot];

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

    const excludeIds = [
      ...items1.map(({ _id }) => _id),
      ...items2.map(({ _id }) => _id),
      ...items3.map(({ _id }) => _id),
      ...latestMovies.map(({ _id }) => _id),
    ];

    const noContain = (item: T_Movie) =>
      excludeIds.findIndex((_id) => _id === item._id) === -1;

    const items4 = ((data[4] as { items: T_Movie[] })?.items || []).filter(
      (item) => noContain(item),
    );
    const items5 = ((data[5] as { items: T_Movie[] })?.items || []).filter(
      (item) => noContain(item),
    );
    const items6 = ((data[6] as { items: T_Movie[] })?.items || []).filter(
      (item) => noContain(item),
    );

    const hotMovies: T_Movie[] = (data[7] as any)
      .map((item: any) =>
        item.status === "fulfilled" ? item.value.movie : null,
      )
      .sort(
        (a: any, b: any) =>
          new Date(b.created.time).getTime() -
          new Date(a.created.time).getTime(),
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
