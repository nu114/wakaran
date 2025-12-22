// src/components/atoms/Seo/Seo.tsx
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

interface SeoProps {
  title: string;
  description?: string;
  meta?: {
    name?: string;
    property?: string;
    content: string;
  }[];
}

export const SEO: React.FC<SeoProps> = ({
  title,
  description = '',
  meta = [],
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author {
              name
            }
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={site.siteMetadata?.author?.name || ''}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {meta.map((item, index) => (
        <meta
          key={index}
          name={item.name}
          property={item.property}
          content={item.content}
        />
      ))}
    </>
  );
};
