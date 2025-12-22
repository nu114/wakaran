// src/pages/profile.tsx
import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { Layout } from '../components/templates/Layout';
import { SEO } from '../components/atoms/SEO';
import { Heading } from '../components/atoms/Heading';
import type { SiteMetadata } from '../types';

interface ProfilePageData {
  site: {
    siteMetadata: SiteMetadata;
  };
}

const ProfilePage: React.FC<PageProps<ProfilePageData>> = ({ data }) => {
  const authorName = data.site.siteMetadata?.author?.name || 'Author';

  return (
    <Layout>
      <div className="profile-page">
        <header className="profile-page__header">
          <Heading level={1} className="profile-page__title">
            Profile
          </Heading>
        </header>

        <main className="profile-page__content">
          <div className="profile-card">
            <div className="profile-card__avatar">
              <StaticImage
                src="../images/hero-platypus.webp"
                alt={authorName}
                placeholder="blurred"
                layout="constrained"
                width={200}
                height={200}
                quality={95}
                className="profile-avatar"
              />
            </div>

            <div className="profile-card__info">
              <Heading level={2} className="profile-card__name">
                {authorName}
              </Heading>

              <div className="profile-card__bio">
                <p>
                  どうもどうも。{authorName}ともうします。<br />
                  なんとか頑張ってIT系のエンジニアやってます。<br />
                  web専門というわけでもなく、仕事に合わせて色々やってます。データ分析とか好きでやってましたね。
                </p>
                <p>
                  基本的にはpythonばかり触っていたのですが、最近はwebのフロントも触る機会が多くtypescriptやらなんやらも触れております。
                  あとなんかRubyとかも触らなきゃいけなくなってます。goも少し触ったんですが忘れました。
                </p>
                <p>
                  IT業界に入る前は機械設計のほうのエンジニアもやってました。そっちのほうのアウトプットも気が向いたらしていきたいとは思ってます。
                  本当にやるかはわからんです。
                </p>
              </div>

              {/* <div className="profile-card__skills">
                <Heading level={3} className="profile-card__skills-title">
                  スキル・興味のある技術
                </Heading>
                <div className="profile-skills">
                  <span className="skill-tag">JavaScript</span>
                  <span className="skill-tag">TypeScript</span>
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">Gatsby</span>
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">CSS</span>
                  <span className="skill-tag">HTML</span>
                  <span className="skill-tag">Git</span>
                </div>
              </div> */}

              <div className="profile-card__social">
                <Heading level={3} className="profile-card__social-title">
                  SNS・リンク
                </Heading>
                <div className="profile-social">
                  <a
                    href="https://x.com/owen_alone"
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    X
                  </a>
                  {/* <a
                    href="https://github.com"
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  <a href="mailto:contact@example.com" className="social-link">
                    Email
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export const Head: React.FC = () => (
  <SEO
    title="プロフィール"
    description="筆者のプロフィールページです。経歴やスキル、SNSリンクなどをご紹介しています。"
  />
);

export default ProfilePage;

export const query = graphql`
  query ProfilePageQuery {
    site {
      siteMetadata {
        title
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
`;
