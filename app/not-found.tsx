import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-shell flex min-h-[60vh] items-center justify-center">
      <div className="card-surface p-10 text-center">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <p className="mt-4 text-[14px] text-gray-500">页面不存在或已被移除</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1 text-[13px] text-[var(--theme-blue)] transition-colors hover:underline"
        >
          回到首页
        </Link>
      </div>
    </div>
  );
}
