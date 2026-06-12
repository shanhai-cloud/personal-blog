export type TocItem = {
  title: string;
  url: string;
  depth?: number;
  items?: TocItem[];
};

export type ContentPost = {
  title: string;
  slug: string;
  date: string;
  updatedAt?: string;
  tags: string[];
  category: string;
  excerpt: string;
  cover?: string;
  published: boolean;
  featured: boolean;
  metadata: {
    readingTime: number;
    wordCount: number;
  };
  toc: TocItem[];
  body: string;
};

export type ContentProject = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  cover?: string;
  link: string;
  published: boolean;
  featured: boolean;
  tags: string[];
  body: string;
};

export type SearchEntry = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
};

export type SiteLinkItem = {
  title: string;
  domain: string;
  url: string;
};

export type SiteNavItem = {
  href: string;
  label: string;
};

export type SiteProfile = {
  name: string;
  headline: string;
  location: string;
  avatar?: string;
  qrCode?: string;
  articleCount: number;
  categoryCount: number;
  tagCount: number;
  followLabel: string;
  followUrl?: string;
  githubUrl?: string;
  messageUrl?: string;
  rssUrl?: string;
};

export type SiteConfig = {
  profile: SiteProfile;
  navigation: SiteNavItem[];
  links: SiteLinkItem[];
  about: {
    title: string;
    description: string;
  };
};
