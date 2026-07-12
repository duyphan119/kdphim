import { API_DOMAIN } from "@/lib/constants";
import qs from "query-string";

const getYears = () =>
  Array.from(
    { length: new Date().getFullYear() - 1970 + 1 },
    (_, i) => 1970 + i,
  ).reverse();

export const yearsApi = {
  movies: async (
    year: number | string,
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
        `${API_DOMAIN}/v1/api/nam/${year}?${qs.stringify(filter || { page: 1 })}`,
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
  items: getYears,
};
