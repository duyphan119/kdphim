import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background/80 px-4 md:px-40 lg:px-56 py-8 text-sm text-muted-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-foreground font-semibold">KDPHIM</p>
          <p className="max-w-2xl leading-6 text-sm text-muted-foreground">
            Xem phim online chất lượng cao, cập nhật phim mới nhất và dễ dàng
            tìm kiếm.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Trang chủ
          </Link>
          <Link
            href="/phim"
            className="hover:text-foreground transition-colors"
          >
            Phim
          </Link>
          <Link
            href="/danh-sach/phim-bo"
            className="hover:text-foreground transition-colors"
          >
            Phim bộ
          </Link>
          <Link
            href="/danh-sach/phim-le"
            className="hover:text-foreground transition-colors"
          >
            Phim lẻ
          </Link>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} KDPHIM. All rights reserved.
      </div>
    </footer>
  );
}
