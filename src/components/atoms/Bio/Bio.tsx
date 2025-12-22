import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

interface BioData {
  site: {
    siteMetadata: {
      author: {
        name: string;
        summary: string;
      };
      social: {
        twitter: string;
      };
    };
  };
}

export const Bio: React.FC = () => {
  const data: BioData = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `);

  const author = data.site.siteMetadata?.author;
  const social = data.site.siteMetadata?.social;

  return (
    <div className="bio">
      {author?.name && (
        <p>
          Written by
          {` `}
          <a href={`https://x.com/owen_alone}`}>
            {author.name}
          </a>
        </p>
      )}
    </div>
  );
};
