import { API_DOMAIN } from "@/lib/constants";

export type CastsResponse = {
  profile_sizes: {
    h632: string;
    original: string;
    w185: string;
    w45: string;
  };
  peoples: T_People[];
} | null;

const getCasts = async (slug: string): Promise<CastsResponse> => {
  try {
    const response = await fetch(`${API_DOMAIN}/v1/api/phim/${slug}/peoples`);

    const json = await response.json();

    if (json.data) return json.data;
  } catch (error) {
    console.log("castsApi,getCasts,error", error);
  }

  return null;
};

export const castsApi = {
  casts: getCasts,
};
