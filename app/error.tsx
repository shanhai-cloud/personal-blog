"use client";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("[Page Error]", error);

  return (
    <div className="container-shell flex min-h-[60vh] items-center justify-center">
      <div className="card-surface p-10 text-center">
        <h1 className="text-2xl font-bold text-gray-800">出了点问题</h1>
        <p className="mt-2 text-[14px] text-gray-500">服务器错误，请稍后再试</p>
        <button
          onClick={reset}
          className="mt-6 cursor-pointer text-[13px] text-[var(--theme-blue)] transition-colors hover:underline"
        >
          重试
        </button>
      </div>
    </div>
  );
}
