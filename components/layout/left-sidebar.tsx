import Link from "next/link";
import { Github, MapPin, MessageCircle, Rss } from "lucide-react";

import type { SiteConfig } from "@/lib/content/types";

export function LeftSidebar({
  profile,
  links
}: {
  profile: SiteConfig["profile"];
  links: SiteConfig["links"];
}) {
  return (
    <aside className="col-span-1 space-y-4">
      <div className="card-surface flex flex-col items-center p-6 text-center">
        <div className="mb-3 h-[100px] w-[100px] overflow-hidden rounded-sm bg-slate-100">
          {profile.avatar ? (
            <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
          ) : (
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <rect width="100" height="100" fill="#f1f5f9" />
              <circle cx="50" cy="40" r="25" fill="#cbd5e1" />
              <path d="M20 100 C20 70, 80 70, 80 100" fill="#94a3b8" />
            </svg>
          )}
        </div>

        <h2 className="text-[18px] tracking-wide text-gray-800">{profile.name}</h2>
        <p className="mt-1 text-[12px] text-gray-500">{profile.headline}</p>
        <p className="mt-1 flex items-center text-[12px] text-gray-500">
          <MapPin className="mr-1 h-3 w-3" />
          {profile.location}
        </p>

        <div className="mt-5 flex w-full items-center justify-center gap-6">
          <StatBlock value={profile.articleCount} label="文章" />
          <StatBlock value={profile.categoryCount} label="分类" />
          <StatBlock value={profile.tagCount} label="标签" />
        </div>

        <div className="mt-5 flex h-[120px] w-[120px] items-center justify-center border border-gray-100 bg-white p-1">
          {profile.qrCode ? (
            <img src={profile.qrCode} alt="二维码" className="h-full w-full object-contain" />
          ) : (
            <svg className="h-full w-full text-gray-800" viewBox="0 0 100 100" fill="currentColor">
              <path d="M0 0h30v10H10v20H0V0zm0 100h30v-10H10v-20H0v30zM100 0H70v10h20v20h10V0zm0 100H70v-10h20v-20h10v30z" />
              <path d="M10 10h10v10H10V10zm0 70h10v10H10V80zM80 10h10v10H80V10z" />
              <path d="M35 15h5v5h-5zm10 0h5v5h-5zm15 0h5v5h-5zm0 10h5v15h-5zm-15 10h5v5h-5zm10 5h5v5h-5zm-20 10h15v5H35zm30 5h5v5h-5zm10 0h15v5H75zm-30 10h5v15h-5zm10 5h15v5H55zm20 5h5v5h-5z" />
              <rect x="40" y="40" width="20" height="20" fill="white" />
              <circle cx="50" cy="50" r="8" fill="#94a3b8" />
            </svg>
          )}
        </div>

        <Link
          href={profile.followUrl ?? "#"}
          className="mt-4 w-full rounded-full bg-[var(--theme-blue)] py-2 text-[13px] text-white transition-colors hover:bg-[var(--theme-blue-hover)]"
        >
          {profile.followLabel}↗
        </Link>

        <div className="mt-5 flex items-center justify-center gap-5 text-gray-400">
          <SocialIcon href={profile.githubUrl} label="GitHub" icon={<Github className="h-4 w-4" />} />
          <SocialIcon href={profile.messageUrl} label="消息" icon={<MessageCircle className="h-4 w-4" />} />
          <SocialIcon href={profile.rssUrl} label="RSS" icon={<Rss className="h-4 w-4" />} />
        </div>
      </div>

      <div className="card-surface p-5">
        <h3 className="mb-3 border-b border-gray-100 pb-2 text-[12px] text-gray-400">链接</h3>
        <ul className="space-y-3 text-[13px] text-gray-600">
          {links.map((link) => (
            <li key={link.url}>
              <Link href={link.url} target="_blank" className="group flex items-center justify-between">
                <span className="group-hover:text-[var(--theme-blue)]">{link.title}</span>
                <span className="rounded bg-gray-50 px-1 text-[11px] text-gray-400">{link.domain}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function StatBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="cursor-pointer text-center hover:text-[var(--theme-blue)]">
      <span className="block text-[18px] text-gray-800">{value}</span>
      <span className="text-[12px] text-gray-500">{label}</span>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  icon
}: {
  href?: string;
  label: string;
  icon: React.ReactNode;
}) {
  if (!href) {
    return (
      <span aria-label={label} className="text-gray-300">
        {icon}
      </span>
    );
  }

  return (
    <Link href={href} target="_blank" aria-label={label} className="cursor-pointer hover:text-gray-800">
      {icon}
    </Link>
  );
}
