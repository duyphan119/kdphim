

import Breadcrumb from "@/components/breadcrumb";
import { ReloadButton } from "@/components/reload-button";
import { castsApi } from "@/features/casts/api";
import MovieCard from "@/features/movies/components/movie-card";
import { TMDB_IMAGE_DOMAIN } from "@/lib/constants";
import { Shield01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: Promise<{ castId: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { castId } = await params;
  const profile = await castsApi.profile(castId);

  if (!profile) {
    return {
      title: "KDPhim | Không tìm thấy diễn viên",
      description:
        "Không tìm thấy thông tin diễn viên. Nội dung có thể đã bị xóa hoặc hiện chưa khả dụng.",
    }
  }

  const description =
    profile.biography?.trim()
      ? `${profile.name} là ${profile.known_for_department?.toLowerCase() ?? "nghệ sĩ"} ${profile.birthday ? `sinh ngày ${profile.birthday}` : ""
      }${profile.place_of_birth ? ` tại ${profile.place_of_birth}` : ""
      }. ${profile.biography.slice(0, 140)}...`
      : `${profile.name} là ${profile.known_for_department?.toLowerCase() ?? "nghệ sĩ"
      }${profile.birthday ? ` sinh ngày ${profile.birthday}` : ""
      }${profile.place_of_birth ? `, quê tại ${profile.place_of_birth}` : ""
      }. Xem tiểu sử, hình ảnh và danh sách phim ${profile.name} đã tham gia trên KDPhim.`;
  return {
    title: `KDPhim | ${profile.name}`,
    description
  }
}

export default async function Page({ params }: Props) {
  const { castId } = await params;

  const data = await castsApi.details(castId);

  if (!data) return <div className="container mx-auto p-4 lg:py-12"><Message /></div>;

  const { profile, seriesList, singleList } = data;

  if (!profile) return <div className="container mx-auto p-4 lg:py-12"><Message /></div>;


  return (
    <div className="container mx-auto p-4 space-y-4">
      <Breadcrumb
        items={[
          {
            isCurrent: true,
            name: profile.name,
            position: 1,
          },
        ]}
      />

      {/* Profile */}
      <section className="grid gap-8 grid-cols-12 lg:grid-cols-10">
        <div className="col-span-12 md:col-span-3 lg:col-span-2 relative mx-auto aspect-[2/3] w-full overflow-hidden rounded-2xl">
          <Image unoptimized
            src={`${TMDB_IMAGE_DOMAIN}/t/p/w300${profile.profile_path}`}
            alt={profile.name}
            fill
            sizes="(max-width: 640px) 50vw,
              (max-width: 1024px) 33vw,
              (max-width: 1280px) 20vw,
              16vw"
            className="object-cover"
          />
        </div>

        <div className="col-span-12 md:col-span-9 lg:col-span-8 space-y-6">
          <div>
            <h1 className="text-4xl font-bold">{profile.name}</h1>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-zinc-900 p-4">
              <p className="text-sm text-zinc-400">Ngày sinh</p>
              <p className="mt-1 font-medium">{profile.birthday}</p>
            </div>

            <div className="rounded-xl bg-zinc-900 p-4">
              <p className="text-sm text-zinc-400">Nơi sinh</p>
              <p className="mt-1 font-medium">{profile.place_of_birth}</p>
            </div>
          </div>

          {profile.biography ? <div className="space-y-3">
            <h2 className="text-2xl font-semibold">Tiểu sử</h2>

            <div dangerouslySetInnerHTML={{ __html: profile.biography }} className="leading-8 text-zinc-300"></div>
          </div> : null}
        </div>
      </section>

      <MovieSection title="Phim bộ đã tham gia" items={seriesList} />

      <MovieSection title="Phim lẻ đã tham gia" items={singleList} />
    </div>
  )
}

function MovieSection({
  title,
  items,
}: {
  title: string;
  items: T_Movie[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-bold">{title}</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {items.sort((a, b) => new Date(b.modified.time).getTime() - new Date(a.modified.time).getTime()).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </section>
  );
}

function Message() {
  return <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 max-w-xl mx-auto">
    <div className="flex items-start gap-4">
      <div className="rounded-full bg-amber-500/20 p-2">
        <HugeiconsIcon
          icon={Shield01Icon}
          className="text-amber-400"
          size={22}
        />
      </div>

      <div className="flex-1 space-y-2">
        <h3 className="font-semibold text-amber-300">
          Không thể tải thông tin diễn viên
        </h3>

        <p className="text-sm leading-6 text-zinc-300">
          Dữ liệu diễn viên được lấy từ TMDB. Hiện TMDB đang chặn truy cập từ
          một số nhà mạng tại Việt Nam nên thông tin có thể không hiển thị.
        </p>

        <p className="text-sm leading-6 text-zinc-300">
          Vui lòng bật <span className="font-medium text-white">1.1.1.1 (WARP)</span>{" "}
          hoặc sử dụng VPN, sau đó tải lại trang.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="https://one.one.one.one/"
            target="_blank"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
          >
            Tải 1.1.1.1
          </a>

          <ReloadButton
            className="rounded-md border border-zinc-700 px-4 py-2 text-sm transition hover:bg-zinc-800"
          />
        </div>
      </div>
    </div>
  </div>
}