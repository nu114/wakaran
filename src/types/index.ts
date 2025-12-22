// Global type definitions for the Gatsby blog

export interface SiteMetadata {
  title: string;
  description: string;
  siteUrl: string;
  author: {
    name: string;
    summary: string;
  };
  social: {
    twitter: string;
  };
}

// microCMS用の型定義
export interface MicroCMSBlogPost {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
  title: string;
  content: string;
  excerpt?: string;
  slug?: string;
  category?: {
    id: string;
    name: string;
  };
  tags?: {
    id: string;
    name: string;
  }[];
  eyecatch?: {
    url: string;
    width: number;
    height: number;
  };
}

export interface PageContext {
  id: string;
  previousPostId?: string;
  nextPostId?: string;
}
