import React from 'react';
import { PageProps } from 'gatsby';
import { Layout } from '../components/templates/Layout';
import { SEO } from '../components/atoms/SEO';
import { Heading } from '../components/atoms/Heading';
const ContactPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="contact-page">
        <header className="contact-page__header">
          <Heading level={1} className="contact-page__title">
            Contact
          </Heading>
        </header>

        <main className="contact-page__content">
          <div className="contact-content">
            <div className="construction-notice">
              <div className="construction-icon">🚧</div>
              <Heading level={2} className="construction-title">
                工事中
              </Heading>
              <p className="construction-message">
                お問い合わせページは現在準備中です。<br />
                しばらくお待ちください。
              </p>
              <div className="construction-details">
                <p>SNSでの直接メッセージも受け付けております</p>
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
    title="お問い合わせ"
    description="お問い合わせページは現在準備中です。ご不便をおかけして申し訳ございません。"
  />
);

export default ContactPage;
