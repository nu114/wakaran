import React from 'react';
import { Layout } from '../../templates/Layout';
import { Hero } from '../../organisms/Hero';
import { PostList } from '../../organisms/PostList';
import { SEO } from '../../atoms/SEO';
import { MicroCMSBlogPost } from '../../../types';

interface HomePageProps {
  posts: MicroCMSBlogPost[];
  siteTitle?: string;
  authorName?: string;
  authorBio?: string;
}

export const HomePage: React.FC<HomePageProps> = ({ posts }) => {
  return (
    <Layout>
      <SEO
        description="Welcome to my blog - sharing thoughts on development, design, and life."
        siteTitleOnly
        title="Home"
      />

      {/* ヒーローセクション */}
      <Hero />

      {/* ブログ記事一覧 */}
      <main>
        {posts && posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <section className="no-posts">
            <h2>No blog posts found</h2>
            <p>Start writing your first blog post!</p>
          </section>
        )}
      </main>
    </Layout>
  );
};
