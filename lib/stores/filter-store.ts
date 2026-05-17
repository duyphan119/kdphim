import { createStore } from "zustand/vanilla";
import { Category } from "../category/types";
import { Country } from "../country/types";
import { typeList } from "../video/data";

export type FilterState = {
  categories: Category[];
  countries: Country[];
  years: number[];
  type_list: { name: string; slug: string }[];
  params?: Partial<{
    type_list: string;
    category: string;
    country: string;
    year: string;
    sort_field: string;
    sort_type: "asc" | "desc";
    sort_lang: string;
  }>;
};

export type FilterActions = {
  setCategories: (categories: Category[]) => void;
  setCountries: (countries: Country[]) => void;
  setYears: (years: number[]) => void;
  selectTypeList: (type_list: string) => void;
  selectCategory: (category: string) => void;
  selectCountry: (country: string) => void;
  selectYear: (year: string) => void;
  selectSortField: (sort_field: string) => void;
  selectSortType: (sort_type: "asc" | "desc") => void;
  reset: (params: Record<string, string>) => void;
};

export type FilterStore = FilterState & FilterActions;

export const defaultInitState: FilterState = {
  categories: [],
  countries: [],
  years: [],
  type_list: typeList,
};

export const createFilterStore = (
  initState: FilterState = defaultInitState,
) => {
  return createStore<FilterStore>()((set) => ({
    ...initState,
    setCategories: (categories: Category[]) =>
      set((state) => ({ ...state, categories })),
    setCountries: (countries: Country[]) =>
      set((state) => ({ ...state, countries })),
    setYears: (years: number[]) => set((state) => ({ ...state, years })),
    selectTypeList: (type_list: string) =>
      set((state) => ({
        ...state,
        params: { ...state.params, type_list },
      })),
    selectCategory: (category: string) =>
      set((state) => ({ ...state, params: { ...state.params, category } })),
    selectCountry: (country: string) =>
      set((state) => ({ ...state, params: { ...state.params, country } })),
    selectYear: (year: string) =>
      set((state) => ({ ...state, params: { ...state.params, year } })),
    selectSortField: (sort_field: string) =>
      set((state) => ({ ...state, params: { ...state.params, sort_field } })),
    selectSortType: (sort_type: "asc" | "desc") =>
      set((state) => ({ ...state, params: { ...state.params, sort_type } })),

    reset: (params: Record<string, string>) =>
      set((state) => ({ ...state, params })),
  }));
};
