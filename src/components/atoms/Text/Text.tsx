// src/components/atoms/Text/Text.tsx
import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'div';
}

export const Text: React.FC<TextProps> = ({
  children,
  className = '',
  as = 'p',
}) => {
  const Tag = as;

  return <Tag className={`text ${className}`}>{children}</Tag>;
};
