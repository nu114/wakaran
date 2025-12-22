// src/pages/categories.tsx
import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Layout } from '../components/templates/Layout';
import { SEO } from '../components/atoms/SEO';
import { Heading } from '../components/atoms/Heading';
import { CategoryCard } from '../components/molecules/CategoryCard';

interface CategoryWithCount {
  id: string;
  name: string;
  postCount: number;
}

interface CategoriesPageData {
  allMicrocmsBlogs: {
    group: {
      fieldValue: string;
      nodes: {
        category: {
          name: string;
        };
      }[];
    }[];
  };
}

const CategoriesPage: React.FC<PageProps<CategoriesPageData>> = ({ data }) => {
  // カテゴリデータを整形
  const categories: CategoryWithCount[] = data.allMicrocmsBlogs.group.map(
    (group) => ({
      id: group.fieldValue,
      name: group.nodes[0]?.category?.name || 'Unknown',
      postCount: group.nodes.length,
    }),
  );

  return (
    <Layout>
      <div className="categories-page">
        <header className="categories-page__header">
          <Heading level={1} className="categories-page__title">
            Categories
          </Heading>
          <p className="categories-page__description">
            Find articles by your interested categories
          </p>
        </header>

        <main className="categories-page__content">
          {categories.length > 0 ? (
            <div className="categories-page__tags">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  className="categories-page__tag"
                />
              ))}
            </div>
          ) : (
            <div className="categories-page__empty">
              <p>Categories not found.</p>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
};

export const Head: React.FC = () => (
  <SEO
    title="カテゴリ一覧"
    description="ブログ記事のカテゴリ一覧ページです。興味のあるカテゴリから記事を探すことができます。"
  />
);

export default CategoriesPage;

export const query = graphql`
  query CategoriesPageQuery {
    allMicrocmsBlogs {
      group(field: { category: { id: SELECT } }) {
        fieldValue
        nodes {
          category {
            name
          }
        }
      }
    }
  }
`;
