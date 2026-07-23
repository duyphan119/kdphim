import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stripHtml = (text?: string) =>
  text?.replace(/<[^>]+>/g, "").trim() || "";

export const getServerName = (name?: string) =>
  name?.replace("#Hà Nội (", "").replace(")", "") || "";

export const isEqualArray = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) return false;
  console.log({ arr1, arr2 });
  const sorted1 = [...arr1].sort();
  const sorted2 = [...arr2].sort();

  return sorted1.every((item, index) => item === sorted2[index]);
};

export function shuffleArray(items: string[]): string[] {
  if (process.env.NODE_ENV !== "development") {
    return items;
  }
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  console.log("shuffle", result);

  return result;
}
