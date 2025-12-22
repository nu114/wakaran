// src/components/templates/Layout/Layout.tsx
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Header } from '../../organisms/Header';
import { Footer } from '../../organisms/Footer';

// Import styles
import '../../../styles/global.css';
import '../../../styles/components.css';
import '../../../styles/responsive.css';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          author {
            name
          }
        }
      }
    }
  `);

  return (
    <div className={`site-wrapper ${className}`}>
      <Header siteTitle={data.site.siteMetadata?.title || 'My Blog'} />

      <main className="site-main" role="main">
        {children}
      </main>

      <Footer authorName={data.site.siteMetadata?.author?.name || 'Author'} />
    </div>
  );
};
