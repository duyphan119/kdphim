type ApiResponse = {
  status: boolean;
  msg: string;
  data: Data;
};

type Data = {
  seoOnPage: SeoOnPage;
  breadCrumb: BreadcrumbItem[];
  titlePage: string;
  items: MovieItem[];
  params: Params;
  type_list: string;
  APP_DOMAIN_FRONTEND: string;
  APP_DOMAIN_CDN_IMAGE: string;
};

type VideoDetailsResponse = {
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
    category: Category[];
    country: Country[];
  };
  episodes: Episode[];
};

type Episode = {
  server_name: string;
  server_data: ServerData[];
};

type ServerData = {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
};

type TypeList =
  | "phim-bo"
  | "phim-le"
  | "tv-shows"
  | "hoat-hinh"
  | "phim-vietsub"
  | "phim-thuyet-minh"
  | "phim-long-tieng";

type VideosParams = {
  type_list?: TypeList;
  page?: string;
  sort_field?: string;
  sort_type?: "desc" | "asc";
  sort_lang?: "vietsub" | "thuyetminh" | "longtieng";
  category?: string;
  country?: string;
  year?: string;
  limit?: string;
};

type SeoOnPage = {
  og_type: string;
  titleHead: string;
  descriptionHead: string;
  og_image: string[];
  og_url: string;
};

type BreadcrumbItem = {
  name: string;
  slug?: string;
  isCurrent: boolean;
  position: number;
};

type MovieItem = {
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

type Tmdb = {
  type: string | null;
  id: string | number | null;
  season: number | null;
  vote_average: number;
  vote_count: number;
};

type Imdb = {
  id: string | null;
};

type TimeObject = {
  time: string;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Country = {
  id: string;
  name: string;
  slug: string;
};

type Params = {
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

type Pagination = {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  totalPages: number;
};

type RecommendedVideo = {
  name: string;
  slug: string;
  poster_url: string;
};

type Cast = {
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

type CastProfile = {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null; // có thể null nếu không rõ
  deathday: string | null; // có thể null nếu người đó còn sống
  gender: 0 | 1 | 2 | 3; // theo TMDB docs
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
};

type TvCredit = {
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

type MovieCredit = {
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
