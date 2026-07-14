type T_SeoOnPage = {
  og_type: string;
  titleHead: string;
  descriptionHead: string;
  og_image: string[];
  og_url: string;
};

type T_BreadcrumbItem = {
  name: string;
  slug?: string;
  isCurrent: boolean;
  position: number;
};

type T_Pagination = {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  totalPages: number;
};

type T_Params = {
  pagination: T_Pagination;
  type_slug: string;
  slug: string;
  filterCategory: string[];
  filterCountry: string[];
  filterYear: string[];
  filterType: string[];
  sortField: string;
  sortType: string;
};

type T_TMDB = {
  id: string | null;
  type: string;
  vote_average: number;
  vote_count: number;
};

type T_IMDB = {
  id: string | null;
  vote_average: number;
  vote_count: number;
};

type T_Created = {
  time: string;
};

type T_Modified = T_Created;

type T_Country = {
  id: string;
  name: string;
  slug: string;
};

type T_Category = T_Country;

type T_Movie = {
  tmdb: T_TMDB;
  imdb: T_IMDB;
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  alternative_names: string[];
  created: T_Created;
  modified: T_Modified;
  content: string;
  type: "series" | "single";
  status: string;
  thumb_url: string;
  poster_url: string;
  trailer_url: string;
  episode_current: string;
  episode_total: number;
  lang: string;
  quality: string;
  actor: string[];
  year: number;
  view: number;
  director: string[];
  category: T_Category[];
  country: T_Country[];
};

type T_ServerDataItem = {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
};

type T_Episode = {
  server_name: string;
  is_ai: boolean;
  server_data: T_ServerDataItem[];
};

type T_TypelistItem = "phim-le" | "phim-bo" | "hoat-hinh" | "tv-shows";

type T_Filter = {
  type_list?: T_TypelistItem;
  page?: string;
  sort_field?: string;
  sort_type?: "desc" | "asc";
  sort_lang?: "vietsub" | "thuyetminh" | "longtieng";
  category?: string;
  country?: string;
  year?: string;
  limit?: string;
};

type T_People = {
  tmdb_people_id: number;
  adult: boolean;
  gender: 1 | 2;
  gender_name: string;
  name: string;
  original_name: string;
  character: string;
  known_for_department: string;
  profile_path: string;
  also_known_as: string[] | null;
};

type T_WatchedMovie = {
  name: string;
  slug: string;
  poster_url: string;
  thumb_url: string;

  server_index: number;

  episode_slug: string;
  episode_name: string;
};

type T_Cast = {
  adult: boolean;
  gender: number; // 1 = Nữ, 2 = Nam, 0 = Không xác định
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  character: string;
  credit_id: string;
  order: number;
};

type T_CastProfile = {
  biography?: string;
  birthday?: string | null; // có thể null nếu không rõ
  gender: number; // theo TMDB docs
  id: number;
  name: string;
  place_of_birth?: string | null;
  profile_path: string | null;
};

type T_TvCredit = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string | null;
  name: string;
  vote_average: number;
  vote_count: number;

  // thêm từ credits
  character: string;
  credit_id: string;
  episode_count: number;
};

type T_MovieCredit = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;

  // thêm từ credits
  character: string;
  credit_id: string;
  order: number;
};
