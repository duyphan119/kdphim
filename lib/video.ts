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
    `https://phimapi.com/v1/api/the-loai/${categorySlug}?${query}`,
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

export const getVideoByTmdb = async (tmdbType: string, tmdbId: string) => {
  const res = await fetch(`https://phimapi.com/tmdb/${tmdbType}/${tmdbId}`, {
    next: { revalidate: 60, tags: ["video-tmdb", tmdbType, tmdbId] },
  });

  return res.json() as Promise<VideoDetailsResponse>;
};

export const getVideosByCast = async (castId: string) => {
  const res = await Promise.allSettled([
    fetch(
      `https://api.themoviedb.org/3/person/${castId}/tv_credits?language=vi-VN`,
      {
        next: { revalidate: 100 },
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      },
    ),
    fetch(
      `https://api.themoviedb.org/3/person/${castId}/movie_credits?language=vi-VN`,
      {
        next: { revalidate: 100 },
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      },
    ),
  ]);

  const items1: VideoDetailsResponse["movie"][] = [];
  const items2: VideoDetailsResponse["movie"][] = [];
  if (res[0].status === "fulfilled") {
    // items = res[0].value
    const data: { cast: TvCredit[] } = await res[0].value.json();

    for (let i = 0; i < data.cast.length; i++) {
      const data1 = await getVideoByTmdb("tv", data.cast[i].id + "");
      if (data1?.movie) {
        items1.push(data1.movie);
      }
    }
  }
  if (res[1].status === "fulfilled") {
    // items = res[0].value
    const data: { cast: TvCredit[] } = await res[1].value.json();

    for (let i = 0; i < data.cast.length; i++) {
      const data1 = await getVideoByTmdb("movie", data.cast[i].id + "");
      if (data1?.movie) {
        items2.push(data1.movie);
      }
    }
  }

  items1.sort(
    (a, b) =>
      new Date(b.created.time).getTime() - new Date(a.created.time).getTime(),
  );
  items2.sort(
    (a, b) =>
      new Date(b.created.time).getTime() - new Date(a.created.time).getTime(),
  );

  return { tvList: items1, movieList: items2 };
};
