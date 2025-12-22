// src/templates/Category.tsx
import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/templates/Layout';
import { SEO } from '../components/atoms/SEO';
import { PostCard } from '../components/molecules/PostCard';
import { Heading } from '../components/atoms/Heading';
import type { MicroCMSBlogPost } from '../types';

interface CategoryTemplateData {
  allMicrocmsBlogs: {
    nodes: MicroCMSBlogPost[];
  };
  microcmsCategories: {
    name: string;
  };
}

interface CategoryTemplateProps {
  data: CategoryTemplateData;
  pageContext: {
    name: string;
  };
}

const CategoryTemplate: React.FC<CategoryTemplateProps> = ({
  data,
  pageContext,
}) => {
  const posts = data?.allMicrocmsBlogs?.nodes || [];
  const categoryName = pageContext?.name || 'Unknown Category';

  // エラーハンドリング
  if (!data) {
    console.error('Category page: No data received');
    return (
      <Layout>
        <div className="error-page">
          <h1>エラーが発生しました</h1>
          <p>カテゴリデータを取得できませんでした。</p>
        </div>
      </Layout>
    );
  }

  if (!data.allMicrocmsBlogs) {
    return (
      <Layout>
        <div className="error-page">
          <h1>カテゴリ: {categoryName}</h1>
          <p>このカテゴリのデータを取得できませんでした。</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="post-list">
        <div className="post-list__container">
          <header className="post-list__header">
            <Heading level={1} className="post-list__title">
              Category: {categoryName}
            </Heading>
          </header>
          {posts.length > 0 ? (
            <div className="post-list__grid">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p>このカテゴリの記事はまだありません。</p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export const Head: React.FC<CategoryTemplateProps> = ({ pageContext }) => (
  <SEO title={`Category: ${pageContext.name}`} />
);

export default CategoryTemplate;

export const pageQuery = graphql`
  query ($id: String!) {
    allMicrocmsBlogs(
      filter: { category: { id: { eq: $id } } }
      sort: { createdAt: DESC }
    ) {
      nodes {
        id
        title
        content
        createdAt
        updatedAt
        publishedAt
        category {
          id
          name
        }
        eyecatch {
          url
          width
          height
        }
      }
    }
  }
`;
