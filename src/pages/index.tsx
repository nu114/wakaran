// src/pages/index.tsx
import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { HomePage } from '../components/pages/HomePage';
import { MicroCMSBlogPost, SiteMetadata } from '../types';

interface IndexPageData {
  allMicrocmsBlogs: {
    nodes: MicroCMSBlogPost[];
  };
  site: {
    siteMetadata: Pick<SiteMetadata, 'title' | 'author'>;
  };
}

const IndexPage: React.FC<PageProps<IndexPageData>> = ({ data }) => (
  <HomePage
    posts={data.allMicrocmsBlogs.nodes}
    siteTitle={data.site.siteMetadata.title}
    authorName={data.site.siteMetadata.author?.name || 'Author'}
    authorBio={data.site.siteMetadata.author?.summary || 'Welcome to my blog'}
  />
);

export default IndexPage;

// microCMS用のGraphQLクエリ
export const query = graphql`
  query BlogIndexQuery {
    site {
      siteMetadata {
        title
        author {
          name
          summary
        }
      }
    }
    allMicrocmsBlogs(sort: { createdAt: DESC }) {
      nodes {
        id
        title
        content
        createdAt(formatString: "MMMM DD, YYYY")
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
