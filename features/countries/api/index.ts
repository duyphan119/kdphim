import { API_DOMAIN } from "@/lib/constants";
import qs from "query-string";

export const countriesApi = {
  movies: async (
    slug: string,
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
        `${API_DOMAIN}/v1/api/quoc-gia/${slug}?${qs.stringify(filter || { page: 1 })}`,
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
      console.log("countriesApi,movies,error", error);
    }

    return null;
  },
  items: async (): Promise<T_Country[]> => {
    try {
      const response = await fetch(`${API_DOMAIN}/quoc-gia`);

      const json = await response.json();

      if (json.data) {
        return json.data.items || [];
      }
    } catch (error) {
      console.log("countriesApi,items,error", error);
    }

    return [];
  },
};
