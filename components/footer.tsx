import { typeList } from "@/lib/video";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background/8 py-8 text-sm text-muted-foreground">
      <div className="_container flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-foreground font-semibold">KDPHIM</p>
          <p className="max-w-2xl leading-6 text-sm text-muted-foreground">
            Xem phim online chất lượng cao, cập nhật phim mới nhất và dễ dàng
            tìm kiếm.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <Link
            href="/"
            title="Đi tới trang chủ"
            className="hover:text-destructive transition-colors duration-200"
          >
            Trang chủ
          </Link>
          {typeList.map(({ name, slug }) => (
            <Link
              key={slug}
              href={`/danh-sach/${slug}`}
              title={`Đi tới trang ${name}`.toLowerCase()}
              className="hover:text-destructive transition-colors duration-200"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} KDPHIM. All rights reserved.
      </div>
    </footer>
  );
}
