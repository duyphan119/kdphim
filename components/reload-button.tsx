"use client";

export function ReloadButton({ className }: { className?: string }) {
  return (
    <button
      onClick={() => window.location.reload()}
      className={className}
    >
      Tải lại trang
    </button>
  );
}