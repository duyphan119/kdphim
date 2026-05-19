import queryString from "query-string";

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

export const recommendVideos = [
  {
    slug: "phu-nhan-dai-quan-the-ky-21",
    name: "Phu Nhân Đại Quân Thế Kỷ 21",
    poster_url:
      "https://phimimg.com/upload/vod/20260411-1/19fba2a3671a42514f6506f9d5d3534a.jpg",
    thumb_url:
      "https://phimimg.com/upload/vod/20260411-1/e6bb5b889cf566a8851149e472bd9a0e.jpg",
    episode_current: "Hoàn Tất (12/12)",
  },
];

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

export const searchVideos = async (
  keyword: string,
  params?: Omit<VideosParams, "type_list">,
) => {
  const query = queryString.stringify({
    keyword,
    limit: 20,
    ...params,
  });
  const res = await fetch(`https://phimapi.com/v1/api/tim-kiem?${query}`, {
    next: { revalidate: 60, tags: ["search-videos"] },
  });
  return res.json() as Promise<ApiResponse>;
};

export const getVideosByTypeList = async (
  typeList: TypeList,
  params?: Omit<VideosParams, "type_list">,
) => {
  const query = queryString.stringify({
    limit: 20,
    ...params,
  });

  const res = await fetch(
    `https://phimapi.com/v1/api/danh-sach/${typeList}?${query}`,
    {
      next: { revalidate: 60, tags: ["type-list-videos"] },
    },
  );

  return res.json() as Promise<ApiResponse>;
};

export const getVideosByCountry = async (
  countrySlug: string,
  params?: Omit<VideosParams, "type_list" | "country">,
) => {
  const query = queryString.stringify({
    limit: 20,
    ...params,
  });

  const res = await fetch(
    `https://phimapi.com/v1/api/quoc-gia/${countrySlug}?${query}`,
    {
      next: { revalidate: 60, tags: ["country-videos"] },
    },
  );

  return res.json() as Promise<ApiResponse>;
};

export const getVideosByCategory = async (
  categorySlug: string,
  params?: Omit<VideosParams, "type_list" | "category">,
) => {
  const query = queryString.stringify({
    limit: 20,
    ...params,
  });

  const res = await fetch(
    `https://phimapi.com/v1/api/quoc-gia/${categorySlug}?${query}`,
    {
      next: { revalidate: 60, tags: ["category-videos"] },
    },
  );

  return res.json() as Promise<ApiResponse>;
};

export const getVideosByYear = async (
  year: string | number,
  params?: Omit<VideosParams, "type_list" | "year">,
) => {
  const query = queryString.stringify({
    limit: 20,
    ...params,
  });

  const res = await fetch(`https://phimapi.com/v1/api/nam/${year}?${query}`, {
    next: { revalidate: 60, tags: ["year-videos"] },
  });

  return res.json() as Promise<ApiResponse>;
};

export const getVideo = async (slug: string) => {
  const res = await fetch(`https://phimapi.com/phim/${slug}`, {
    next: { revalidate: 60, tags: ["video", slug] },
  });

  return res.json() as Promise<VideoDetailsResponse>;
};
