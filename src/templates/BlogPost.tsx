import * as React from 'react';
import { Link, graphql } from 'gatsby';

import { Bio } from '../components/atoms/Bio';
import { Layout } from '../components/templates/Layout';
import { SEO } from '../components/atoms/SEO';
import type { MicroCMSBlogPost, SiteMetadata } from '../types';

interface BlogPostData {
  previous?: Pick<MicroCMSBlogPost, 'id' | 'title'>;
  next?: Pick<MicroCMSBlogPost, 'id' | 'title'>;
  site: {
    siteMetadata: Pick<SiteMetadata, 'title'>;
  };
  microcmsBlogs: MicroCMSBlogPost;
}

interface BlogPostTemplateProps {
  data: BlogPostData;
}

const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({
  data: { previous, next, microcmsBlogs: post },
}) => {
  // 日付のフォーマット
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Layout>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <div className="blog-post__meta">
            <p>{formatDate(post.createdAt)}</p>
            {post.category && (
              <Link
                to={`/category/${post.category.id}`}
                className="blog-post__category"
              >
                {post.category.name}
              </Link>
            )}
          </div>
        </header>
        <section
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`/blog/${previous.id}`} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/blog/${next.id}`} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

interface HeadProps {
  data: {
    microcmsBlogs: {
      title: string;
      content: string | null;
    };
  };
}

export const Head: React.FC<HeadProps> = ({
  data: { microcmsBlogs: post },
}) => {
  const description = post.content
    ? post.content.replace(/<[^>]*>/g, '').substring(0, 160)
    : '';

  return (
    <SEO title={post.title} description={description} />
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    microcmsBlogs(id: { eq: $id }) {
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
    previous: microcmsBlogs(id: { eq: $previousPostId }) {
      id
      title
    }
    next: microcmsBlogs(id: { eq: $nextPostId }) {
      id
      title
    }
  }
`;
