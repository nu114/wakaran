// src/components/organisms/PostList/PostList.tsx
import React from 'react';
import { PostCard } from '../../molecules/PostCard';
import { Heading } from '../../atoms/Heading';
import type { MicroCMSBlogPost } from '../../../types';

interface PostListProps {
  posts: MicroCMSBlogPost[];
  title?: string;
  className?: string;
}

export const PostList: React.FC<PostListProps> = ({
  posts,
  title = 'Recent Posts',
  className = '',
}) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className={`post-list ${className}`}>
      <div className="post-list__container">
        <header className="post-list__header">
          <Heading level={2} className="post-list__title">
            {title}
          </Heading>
        </header>

        <div className="post-list__grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} className="post-list__item" />
          ))}
        </div>
      </div>
    </section>
  );
};
