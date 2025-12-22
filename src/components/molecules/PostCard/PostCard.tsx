// src/components/molecules/PostCard/PostCard.tsx
import React from 'react';
import { Link } from 'gatsby';
import { Heading } from '../../atoms/Heading';
import { Text } from '../../atoms/Text';
import type { MicroCMSBlogPost } from '../../../types';

interface PostCardProps {
  post: MicroCMSBlogPost;
  className?: string;
}

export const PostCard: React.FC<PostCardProps> = ({ post, className = '' }) => {
  const { title, createdAt, content, id, category, eyecatch } = post;
  // microCMSではIDベースのURLを使用
  const postSlug = `/blog/${id}`;

  // HTMLからテキストのみを抽出して抜粋を生成
  const getPlainTextExcerpt = (
    html: string | null | undefined,
    length = 150
  ): string => {
    const text = (html ?? '').replace(/<[^>]*>/g, '');
    if (!text) return '';
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

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
    <article className={`post-card ${className}`}>
      {eyecatch && (
        <Link to={postSlug} className="post-card__image-link">
          <img
            src={eyecatch.url}
            alt={title}
            className="post-card__image"
            width={eyecatch.width}
            height={eyecatch.height}
            loading="lazy"
          />
        </Link>
      )}
      <header className="post-card__header">
        <Heading level={3} className="post-card__title">
          <Link to={postSlug} className="post-card__link">
            {title}
          </Link>
        </Heading>

        <div className="post-card__meta">
          <time className="post-card__date" dateTime={createdAt}>
            {formatDate(createdAt)}
          </time>
          {category && (
            <Link
              to={`/category/${category.id}`}
              className="post-card__category"
            >
              {category.name}
            </Link>
          )}
        </div>
      </header>

      <div className="post-card__content">
        <Text className="post-card__excerpt">
          {getPlainTextExcerpt(content, 150)}
        </Text>
      </div>

      <footer className="post-card__footer">
        <Link to={postSlug} className="post-card__read-more">
          続きを読む →
        </Link>
      </footer>
    </article>
  );
};
