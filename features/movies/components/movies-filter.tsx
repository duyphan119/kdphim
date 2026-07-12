"use client";

import { typelistApi } from "@/features/typelist/api";
import { yearsApi } from "@/features/years/api";
import { cn } from "@/lib/utils";
import { Filter } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FilterParams = {
  type_list?: string;
  category?: string[];
  country?: string[];
  year?: string;
  sort_field?: string;
  sort_type?: string;
};

type Props = {
  defaultParams?: T_Filter & { keyword?: string };
  isSearchFilter?: boolean;
  categories: T_Category[];
  countries: T_Country[];
};

export default function MoviesFilter({
  defaultParams = {},
  isSearchFilter = false,
  categories,
  countries
}: Props) {
  const router = useRouter();

  const [filterParams, setFilterParams] = useState<FilterParams>({});
  const [open, setOpen] = useState(false)

  const select = (key: keyof FilterParams, value: string) => {
    if (key === "category" || key === "country") {
      const currentValues = filterParams[key] || [];
      if (currentValues.includes(value)) {
        setFilterParams((prev) => ({
          ...prev,
          [key]: currentValues.filter((v) => v !== value),
        }));
      } else {
        setFilterParams((prev) => ({
          ...prev,
          [key]: [...currentValues, value],
        }));
      }
    } else {
      setFilterParams((prev) => ({
        ...prev,
        [key]: prev[key] === value ? undefined : value,
      }));
    }
  };

  const handleFilter = () => {
    const {
      type_list,
      category = [],
      country = [],
      year,
      sort_field,
      sort_type,
    } = filterParams;

    const createQuery = (params: Record<string, string | undefined>) => {
      return new URLSearchParams(
        Object.entries(params).filter((entry): entry is [string, string] =>
          Boolean(entry[1]),
        ),
      ).toString();
    };

    const commonParams = {
      sort_field,
      sort_type,
    };

    let pathname = "";
    let query = "";
    if (isSearchFilter) {
      pathname = `/tim-kiem`;

      query = createQuery({
        keyword: defaultParams.keyword,
        category: category.length ? category.join(",") : undefined,
        country: country.length ? country.join(",") : undefined,
        ...commonParams,
      });
    } else if (type_list) {
      pathname = `/danh-sach/${type_list}`;

      query = createQuery({
        category: category.length ? category.join(",") : undefined,
        country: country.length ? country.join(",") : undefined,
        year,
        ...commonParams,
      });
    } else if (year) {
      pathname = `/nam/${year}`;

      query = createQuery({
        category: category.length ? category.join(",") : undefined,
        country: country.length ? country.join(",") : undefined,
        ...commonParams,
      });
    } else if (category.length === 1 && country.length === 1) {
      pathname = `/the-loai/${category[0]}`;

      query = createQuery({
        country: country.join(","),
        year,
        ...commonParams,
      });
    } else if (category.length > country.length) {
      pathname = `/quoc-gia/${country[0]}`;

      query = createQuery({
        category: category.join(","),
        year,
        ...commonParams,
      });
    } else if (category.length < country.length) {
      pathname = `/the-loai/${category[0]}`;

      query = createQuery({
        country: country.join(","),
        year,
        ...commonParams,
      });
    } else {
      pathname = `/nam/${new Date().getFullYear()}`;

      query = createQuery({
        category: category.length ? category.join(",") : undefined,
        country: country.length ? country.join(",") : undefined,
        ...commonParams,
      });
    }
    const url = `${pathname}${query ? `?${query}` : ""}`;
    router.push(url);
    setOpen(false);
  };

  const handleReset = () => {
    setFilterParams({
      ...(defaultParams.type_list
        ? { type_list: defaultParams.type_list }
        : undefined),
      ...(defaultParams.year ? { year: defaultParams.year } : undefined),
      ...(defaultParams.sort_field
        ? { sort_field: defaultParams.sort_field }
        : undefined),
      ...(defaultParams.sort_type
        ? { sort_type: defaultParams.sort_type }
        : undefined),
      ...(defaultParams.category
        ? { category: defaultParams.category.split(",") }
        : undefined),
      ...(defaultParams.country
        ? { country: defaultParams.country.split(",") }
        : undefined),
    });
  };

  useEffect(() => {
    handleReset();
  }, [defaultParams]);

  return (
    <>
      <button type="button" onClick={() => setOpen(prev => !prev)} className="inline-flex items-center py-3 px-2 gap-1 text-sm">
        <HugeiconsIcon icon={Filter} size={16} />
        Bộ lọc
      </button>
      {open ? <div className="py-4">
        <div className="grid grid-cols-12 gap-4">
          {isSearchFilter ? null : (
            <div className="col-span-12 bg-background rounded-md p-4 bg-zinc-800">
              <div className="uppercase">Loại phim</div>
              <div className="mt-2 flex gap-2 items-center flex-wrap">
                {typelistApi.items().map(({ name, slug }) => (
                  <button
                    key={slug}
                    onClick={() => select("type_list", slug)}
                    className={cn("text-white text-xs py-1 px-1.5 rounded-md", filterParams?.type_list === slug ? "bg-red-500" : "bg-transparent")}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="col-span-12 bg-background rounded-md p-4 bg-zinc-800">
            <div className="uppercase">Thể loại</div>
            <div className="mt-2 flex gap-2 items-center flex-wrap">
              {categories.map(({ name, slug }) => (
                <button
                  key={slug}
                  onClick={() => select("category", slug)}
                  className={cn("text-white text-xs py-1 px-1.5 rounded-md", filterParams?.category?.includes(slug) ? "bg-red-500" : "bg-transparent")}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          <div className="col-span-12 bg-background rounded-md p-4 bg-zinc-800">
            <div className="uppercase">Quốc gia</div>
            <div className="mt-2 flex gap-2 items-center flex-wrap">
              {countries.map(({ name, slug }) => (
                <button
                  key={slug}
                  onClick={() => select("country", slug)}
                  className={cn("text-white text-xs py-1 px-1.5 rounded-md", filterParams?.country?.includes(slug) ? "bg-red-500" : "bg-transparent")}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          <div className="col-span-12 bg-background rounded-md p-4 bg-zinc-800">
            <div className="uppercase">Năm</div>
            <div className="mt-2 flex gap-2 items-center flex-wrap">
              {yearsApi.items().map((year) => (
                <button
                  key={year}
                  onClick={() => select("year", year + "")}
                  className={cn("text-white text-xs py-1 px-1.5 rounded-md", filterParams?.year === year + "" ? "bg-red-500" : "bg-transparent")}

                >
                  {year}
                </button>
              ))}
            </div>
          </div>
          <div className="col-span-12 bg-background rounded-md p-4 bg-zinc-800">
            <div className="uppercase">Sắp xếp</div>
            <div className="mt-2 flex gap-2 items-center flex-wrap">
              <button
                onClick={() => {
                  select("sort_field", "modified.time");
                  select("sort_type", "desc");
                }}
                className={cn("text-white text-xs py-1 px-1.5 rounded-md", filterParams?.sort_field === "modified.time" &&
                  filterParams.sort_type === "desc" ? "bg-red-500" : "bg-transparent")}
              >
                Cập nhật gần đây
              </button>
              <button
                onClick={() => {
                  select("sort_field", "modified.time");
                  select("sort_type", "asc");
                }}
                className={cn("text-white text-xs py-1 px-1.5 rounded-md", filterParams?.sort_field === "modified.time" &&
                  filterParams.sort_type === "asc" ? "bg-red-500" : "bg-transparent")}
              >
                Cập nhật cũ nhất
              </button>
              <button
                onClick={() => {
                  select("sort_field", "year");
                  select("sort_type", "asc");
                }}
                className={cn("text-white text-xs py-1 px-1.5 rounded-md", filterParams?.sort_field === "year" &&
                  filterParams.sort_type === "asc" ? "bg-red-500" : "bg-transparent")}
              >
                Năm phát hành tăng dần
              </button>
              <button
                onClick={() => {
                  select("sort_field", "year");
                  select("sort_type", "desc");
                }}
                className={cn("text-white text-xs py-1 px-1.5 rounded-md", filterParams?.sort_field === "year" &&
                  filterParams.sort_type === "asc" ? "bg-red-500" : "bg-transparent")}
              >
                Năm phát hành giảm dần
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <button

            onClick={() => handleReset()}
            className="border border-zinc-800 px-3 py-2 rounded-md text-sm"
          >
            Đặt lại
          </button>
          <button onClick={() => handleFilter()} className="bg-red-500 px-3 py-2 rounded-md text-sm">
            Áp dụng
          </button>
        </div>
      </div>
        :
        null}

    </>
  );
}
// <Drawer direction="top" open={open} onOpenChange={setOpen}>
//   <DrawerTrigger
//     asChild
//     onClick={(e) => {
//       // chặn warning Blocked aria-hidden on an element...
//       e.currentTarget.blur();
//     }}
//   >
//     <Button variant="outline">
//       <HugeiconsIcon icon={Filter} />
//       Bộ lọc
//     </Button>
//   </DrawerTrigger>
//   <DrawerContent className="bg-secondary">
//     <DrawerHeader className="sr-only">
//       <DrawerTitle>Bộ lọc phim</DrawerTitle>
//       <DrawerDescription>
//         Lọc phim theo loại phim, thể loại, quốc gia, năm
//       </DrawerDescription>
//     </DrawerHeader>

//     <div className="grid grid-cols-12 gap-4 no-scrollbar overflow-y-auto">
//       {isSearchFilter ? null : (
//         <div className="col-span-12 bg-background rounded-md p-4">
//           <div className="uppercase">Loại phim</div>
//           <div className="mt-2 flex gap-2 items-center flex-wrap">
//             {typeList.map(({ name, slug }) => (
//               <Button
//                 key={slug}
//                 variant={
//                   filterParams?.type_list === slug
//                     ? "destructive"
//                     : "outline"
//                 }
//                 size="xs"
//                 onClick={() => select("type_list", slug)}
//               >
//                 {name}
//               </Button>
//             ))}
//           </div>
//         </div>
//       )}
//       <div className="col-span-12 bg-background rounded-md p-4">
//         <div className="uppercase">Thể loại</div>
//         <div className="mt-2 flex gap-2 items-center flex-wrap">
//           {exampleCategories.map(({ name, slug }) => (
//             <Button
//               key={slug}
//               variant={
//                 filterParams?.category?.includes(slug)
//                   ? "destructive"
//                   : "outline"
//               }
//               size="xs"
//               onClick={() => select("category", slug)}
//             >
//               {name}
//             </Button>
//           ))}
//         </div>
//       </div>
//       <div className="col-span-12 bg-background rounded-md p-4">
//         <div className="uppercase">Quốc gia</div>
//         <div className="mt-2 flex gap-2 items-center flex-wrap">
//           {exampleCountries.map(({ name, slug }) => (
//             <Button
//               key={slug}
//               variant={
//                 filterParams?.country?.includes(slug)
//                   ? "destructive"
//                   : "outline"
//               }
//               size="xs"
//               onClick={() => select("country", slug)}
//             >
//               {name}
//             </Button>
//           ))}
//         </div>
//       </div>
//       <div className="col-span-12 bg-background rounded-md p-4">
//         <div className="uppercase">Năm</div>
//         <div className="mt-2 flex gap-2 items-center flex-wrap">
//           {getYears().map((year) => (
//             <Button
//               key={year}
//               variant={
//                 filterParams?.year === year + "" ? "destructive" : "outline"
//               }
//               size="xs"
//               onClick={() => select("year", year + "")}
//             >
//               {year}
//             </Button>
//           ))}
//         </div>
//       </div>
//       <div className="col-span-12 bg-background rounded-md p-4">
//         <div className="uppercase">Sắp xếp</div>
//         <div className="mt-2 flex gap-2 items-center flex-wrap">
//           <Button
//             variant={
//               filterParams?.sort_field === "modified.time" &&
//               filterParams.sort_type === "desc"
//                 ? "destructive"
//                 : "outline"
//             }
//             size="xs"
//             onClick={() => {
//               select("sort_field", "modified.time");
//               select("sort_type", "desc");
//             }}
//           >
//             Cập nhật gần đây
//           </Button>
//           <Button
//             variant={
//               filterParams?.sort_field === "modified.time" &&
//               filterParams.sort_type === "asc"
//                 ? "destructive"
//                 : "outline"
//             }
//             size="xs"
//             onClick={() => {
//               select("sort_field", "modified.time");
//               select("sort_type", "asc");
//             }}
//           >
//             Cập nhật cũ nhất
//           </Button>
//           <Button
//             variant={
//               filterParams?.sort_field === "year" &&
//               filterParams.sort_type === "asc"
//                 ? "destructive"
//                 : "outline"
//             }
//             size="xs"
//             onClick={() => {
//               select("sort_field", "year");
//               select("sort_type", "asc");
//             }}
//           >
//             Năm phát hành tăng dần
//           </Button>
//           <Button
//             variant={
//               filterParams?.sort_field === "year" &&
//               filterParams.sort_type === "asc"
//                 ? "destructive"
//                 : "outline"
//             }
//             size="xs"
//             onClick={() => {
//               select("sort_field", "year");
//               select("sort_type", "desc");
//             }}
//           >
//             Năm phát hành giảm dần
//           </Button>
//         </div>
//       </div>
//     </div>

//     <DrawerFooter className="mt-4">
//       <Button variant="outline" onClick={() => handleReset()}>
//         Đặt lại
//       </Button>
//       <Button onClick={() => handleFilter()}>Áp dụng</Button>
//     </DrawerFooter>
//   </DrawerContent>
// </Drawer>
