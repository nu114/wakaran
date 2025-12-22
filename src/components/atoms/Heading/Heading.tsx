// src/components/atoms/Heading/Heading.tsx
import React from 'react';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  className = '',
}) => {
  // 型安全な動的要素の作成
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return (
    <Tag className={`heading heading--${level} ${className}`}>{children}</Tag>
  );
};
