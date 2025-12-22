// src/components/organisms/Footer/Footer.tsx
import React from 'react';

interface FooterProps {
  authorName: string;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  authorName,
  className = '',
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`site-footer ${className}`}>
      <div className="footer-container">
        <p className="footer-text">
          © {currentYear} {authorName}. Built with{' '}
          <a
            href="https://www.gatsbyjs.com"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gatsby
          </a>
        </p>
      </div>
    </footer>
  );
};
