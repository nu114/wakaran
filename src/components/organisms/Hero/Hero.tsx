// src/components/organisms/Hero/Hero.tsx
import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  return (
    <section className={`hero ${className}`}>
      <div className="hero-container">
        <div className="hero-content">
          {/* 左側に画像 */}
          <div className="hero-image">
            <StaticImage
              src="../../../images/hero-platypus.webp"
              alt="Platypus illustration"
              placeholder="none"
              layout="constrained"
              width={375}
              height={280}
              quality={95}
              loading="eager"
              formats={["webp", "png"]}
              className="hero-platypus"
            />
          </div>

          {/* 右側にテキスト */}
          <div className="hero-text">
            <p className="hero-description">
              エンジニアやってます。
              <br />
              いろんな技術があり過ぎていっつもこんな感じ。
              <br />
              8割くらいはPCの前で?マーク出してます。
              <br />
              都度調べるのでせっかくならまとめようと思った次第です。
              <br />
              誰かの足しになればこれ幸い。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
