export const typeList = [
  {
    name: "Phim Bộ",
    slug: "phim-bo",
  },
  {
    name: "Phim Lẻ",
    slug: "phim-le",
  },
  {
    name: "TV Shows",
    slug: "tv-shows",
  },
  {
    name: "Hoạt Hình",
    slug: "hoat-hinh",
  },
  {
    name: "Phim Vietsub",
    slug: "phim-vietsub",
  },
  {
    name: "Phim Thuyết Minh",
    slug: "phim-thuyet-minh",
  },
  {
    name: "Phim Lồng Tiếng",
    slug: "phim-long-tieng",
  },
];

export type ApiResponse = {
  status: boolean;
  msg: string;
  data: Data;
};

export type Data = {
  seoOnPage: SeoOnPage;
  breadCrumb: BreadCrumb[];
  titlePage: string;
  items: MovieItem[];
  params: Params;
  type_list: string;
  APP_DOMAIN_FRONTEND: string;
  APP_DOMAIN_CDN_IMAGE: string;
};

export type SeoOnPage = {
  og_type: string;
  titleHead: string;
  descriptionHead: string;
  og_image: string[];
  og_url: string;
};

export type BreadCrumb = {
  name: string;
  slug?: string;
  isCurrent: boolean;
  position: number;
};

export type MovieItem = {
  tmdb: Tmdb;
  imdb: Imdb;
  created: TimeObject;
  modified: TimeObject;
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  type: "series" | "single";
  poster_url: string;
  thumb_url: string;
  sub_docquyen: boolean;
  chieurap: boolean;
  time: string;
  episode_current: string;
  quality: string;
  lang: string;
  year: number;
  category: Category[];
  country: Country[];
};

export type Tmdb = {
  type: string | null;
  id: string | number | null;
  season: number | null;
  vote_average: number;
  vote_count: number;
};

export type Imdb = {
  id: string | null;
};

export type TimeObject = {
  time: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Country = {
  id: string;
  name: string;
  slug: string;
};

export type Params = {
  type_slug: string;
  slug: string;
  filterCategory: string[];
  filterCountry: string[];
  filterYear: string[];
  filterType: string[];
  sortField: string;
  sortType: "asc" | "desc";
  pagination: Pagination;
};

export type Pagination = {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  totalPages: number;
};

export const getLatestVideos = async (params: { page: number }) => {
  try {
    const response = await fetch(
      `https://phimapi.com/danh-sach/phim-moi-cap-nhat-v3?page=${params.page}`,
      { next: { revalidate: 60 } },
    );

    const {
      items,
      pagination,
    }: {
      status: boolean;
      msg: string;
      items: MovieItem[];
      pagination: Pagination;
    } = await response.json();
    return { items, pagination };
  } catch (error) {
    console.error("Error fetching latest videos:", error);
    return null;
  }
};

/**
 * Tìm kiếm phim theo keyword với các bộ lọc mặc định
 * @param query - Từ khóa tìm kiếm
 * @returns Dữ liệu phim hoặc null nếu có lỗi
 */
export const searchVideos = async (query: string) => {
  try {
    const params = new URLSearchParams({
      keyword: query,
      page: "1",
      sort_field: "_id",
      sort_type: "asc",
      sort_lang: "vietsub",
      limit: "10",
    });

    const response = await fetch(
      `https://phimapi.com/v1/api/timkiem?${params}`,
      { next: { revalidate: 60 } },
    );

    const data: ApiResponse = await response.json();

    return data.data as Data;
  } catch (error) {
    console.error("Error searching videos:", error);
    return null;
  }
};

export type VideosParams = {
  type_list?:
    | "phim-bo"
    | "phim-le"
    | "tv-shows"
    | "hoat-hinh"
    | "phim-vietsub"
    | "phim-thuyet-minh"
    | "phim-long-tieng"
    | string;
  page?: string;
  sort_field?: string;
  sort_type?: "desc" | "asc";
  sort_lang?: "vietsub" | "thuyetminh" | "longtieng";
  category?: string;
  country?: string;
  year?: string;
  limit?: string;
};

/**
 * Lấy danh sách phim theo loại với các bộ lọc
 * @param type_list - Loại phim (phim-bo, phim-le, tv-shows, v.v.)
 * @param params - Các tham số lọc (page, sort_field, sort_type, v.v.)
 * @returns Dữ liệu phim hoặc null nếu có lỗi
 */
export const getVideos = async ({ type_list, ...params }: VideosParams) => {
  try {
    const queryParams = new URLSearchParams({
      ...(params.limit ? { limit: params.limit } : {}),
      ...(params.page ? { page: params.page } : {}),
      ...(params.sort_field ? { sort_field: params.sort_field } : {}),
      ...(params.sort_type ? { sort_type: params.sort_type } : {}),
      ...(params.sort_lang ? { sort_lang: params.sort_lang } : {}),
      ...(params.category ? { category: params.category } : {}),
      ...(params.country ? { country: params.country } : {}),
      ...(params.year ? { year: params.year } : {}),
    }).toString();

    const response = await fetch(
      `https://phimapi.com/v1/api/danh-sach/${type_list}?${queryParams}`,
      { next: { revalidate: 60 } },
    );

    const { data }: ApiResponse = await response.json();

    return data;
  } catch (error) {
    console.error(`Error fetching videos for type ${type_list}:`, error);
    return null;
  }
};

export type VideoDetailsResponse = {
  status: boolean;
  msg: string;
  movie: {
    tmdb: {
      type: string | null;
      id: string | number | null;
      season: number | null;
      vote_average: number;
      vote_count: number;
    };
    imdb: {
      id: string | null;
    };
    created: {
      time: string;
    };
    modified: {
      time: string;
    };
    _id: string;
    name: string;
    slug: string;
    origin_name: string;
    content: string;
    type: "series" | "single";
    status: "ongoing" | "completed";
    poster_url: string;
    thumb_url: string;
    is_copyright: boolean;
    sub_docquyen: boolean;
    chieurap: boolean;
    trailer_url: string;
    time: string;
    episode_current: string;
    episode_total: string;
    quality: string;
    lang: string;
    notify: string;
    showtimes: string;
    year: number;
    view: number;
    actor: string[];
    director: string[];
    category: {
      id: string;
      name: string;
      slug: string;
    }[];
    country: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
  episodes: {
    server_name: string;
    server_data: {
      name: string;
      slug: string;
      filename: string;
      link_embed: string;
      link_m3u8: string;
    }[];
  }[];
};

/**
 * Lấy chi tiết phim bao gồm thông tin phim và danh sách tập
 * @param slug - Slug của phim
 * @returns Dữ liệu chi tiết phim hoặc null nếu có lỗi
 */
export const getVideoDetails = async (slug: string) => {
  try {
    const response = await fetch(`https://phimapi.com/phim/${slug}`, {
      next: { revalidate: 60 },
    });

    const { movie, episodes }: VideoDetailsResponse = await response.json();

    return { movie, episodes };
  } catch (error) {
    console.error(`Error fetching video details for slug ${slug}:`, error);
    return null;
  }
};
