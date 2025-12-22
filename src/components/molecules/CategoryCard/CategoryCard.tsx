// src/components/molecules/CategoryCard/CategoryCard.tsx
import React from 'react';
import { Link } from 'gatsby';
import { Heading } from '../../atoms/Heading';
import { Text } from '../../atoms/Text';

interface CategoryWithCount {
  id: string;
  name: string;
  postCount: number;
}

interface CategoryCardProps {
  category: CategoryWithCount;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  className = '',
}) => {
  const { id, name, postCount } = category;

  return (
    <Link
      to={`/category/${id}`}
      className={`category-card ${className}`}
    >
      <div className="category-card__icon">#</div>
      <div className="category-card__content">
        <Heading level={3} className="category-card__title">
          {name}
        </Heading>
        <Text className="category-card__count">{postCount}件</Text>
      </div>
      <div className="category-card__arrow">→</div>
    </Link>
  );
};
