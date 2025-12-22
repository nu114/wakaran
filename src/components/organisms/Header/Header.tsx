// src/components/organisms/Header/Header.tsx
import React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

interface HeaderProps {
  siteTitle: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  siteTitle,
  className = '',
}) => {
  return (
    <header className={`site-header ${className}`}>
      <div className="header-container">
        <Link to="/" className="site-title-link">
          <StaticImage
            src="../../../images/title-wakaran.png"
            alt={siteTitle}
            placeholder="blurred"
            layout="constrained"
            width={200}
            height={40}
            quality={95}
            className="site-title-image"
          />
        </Link>

        <nav className="site-nav">
          <Link to="/" className="nav-link" activeClassName="active">
            Home
          </Link>
          <Link to="/categories" className="nav-link" activeClassName="active">
            Categories
          </Link>
          <Link to="/profile" className="nav-link" activeClassName="active">
            Profile
          </Link>
          <Link to="/contact" className="nav-link" activeClassName="active">
            Contact
          </Link>
          <Link to="/policy" className="nav-link" activeClassName="active">
            Policy
          </Link>
        </nav>
      </div>
    </header>
  );
};
