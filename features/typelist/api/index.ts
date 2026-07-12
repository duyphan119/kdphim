import { API_DOMAIN } from "@/lib/constants";
import qs from "query-string";

const typelist = [
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
];
export const typelistApi = {
  movies: async (
    slug: T_TypelistItem,
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
        `${API_DOMAIN}/v1/api/danh-sach/${slug}?${qs.stringify(filter || { page: 1 })}`,
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
      console.log("typelistApi,movies,error", error);
    }

    return null;
  },
  items: () => typelist,
};
