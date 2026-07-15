// import Breadcrumb from "@/components/breadcrumb";
// import CastProfile from "@/components/cast-profile";
// import CastVideos from "@/components/cast-videos";
// import { Metadata } from "next";

import Breadcrumb from "@/components/breadcrumb";
import { castsApi } from "@/features/casts/api";

// type Props = {
//   params: Promise<{ castId: string }>;
// };

// export const generateMetadata = async ({
//   params,
// }: Props): Promise<Metadata> => {
//   const awaitedParams = await params;

//   const castDetails = await getCastDetails(awaitedParams.castId);
//   if (!castDetails) return { title: "KDPhim | Diễn viên", description: "Thông tin và phim của diễn viên" };

//   return {
//     title: `KDPhim | Diễn viên ${castDetails.name}`,
//     description: `Thông tin và phim của diễn viên ${castDetails.name}`,
//   };
// };

// export default async function Page({ params }: Props) {
//   const awaitedParams = await params;

//   const castDetails = await getCastDetails(awaitedParams.castId);
//   if (!castDetails) return null;

//   return (
//     <div className="_container py-4">
//       <div className="grid grid-cols-4 gap-4">
//         <div className="col-span-4">
//           <Breadcrumb
//             items={[
//               {
//                 isCurrent: true,
//                 name: castDetails.name,
//                 position: 1,
//               },
//             ]}
//           />
//         </div>
//         <div className="col-span-4 md:col-span-1">
//           <CastProfile {...castDetails} />
//         </div>
//         <CastVideos castId={awaitedParams.castId} />
//       </div>
//     </div>
//   );
// }

type Props = {
  params: Promise<{ castId: string }>
}

export default async function Page({ params }: Props) {
  const { castId } = await params;

  const data = await castsApi.details(castId);
  return (
    <div className="container mx-auto p-4 space-y-4">
      <Breadcrumb
        items={[
          // {
          //   isCurrent: true,
          //   name: castDetails.name,
          //   position: 1,
          // },
        ]}
      />

      <div className="">
        {JSON.stringify(data)}
      </div>
    </div>
  )
}