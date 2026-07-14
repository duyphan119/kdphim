import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stripHtml = (text?: string) =>
  text?.replace(/<[^>]+>/g, "").trim() || "";

export const getServerName = (name?: string) =>
  name?.replace("#Hà Nội (", "").replace(")", "") || "";

export const getYears = () =>
  Array.from(
    { length: new Date().getFullYear() - 1970 + 1 },
    (_, i) => 1970 + i,
  ).reverse();

export const isEqualArray = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) return false;

  const sorted1 = [...arr1].sort();
  const sorted2 = [...arr2].sort();

  return sorted1.every((item, index) => item === sorted2[index]);
};
