// src/pages/policy.tsx
import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Layout } from '../components/templates/Layout';
import { SEO } from '../components/atoms/SEO';
import { Heading } from '../components/atoms/Heading';
import type { SiteMetadata } from '../types';

interface PolicyPageData {
  site: {
    siteMetadata: SiteMetadata;
  };
}

const PolicyPage: React.FC<PageProps<PolicyPageData>> = ({ data }) => {
  const siteUrl = data.site.siteMetadata?.siteUrl || 'https://example.com';

  return (
    <Layout>
      <div className="policy-page">
        <header className="policy-page__header">
          <Heading level={1} className="policy-page__title">
            Privacy Policy
          </Heading>
          <p className="policy-page__updated">Last updated: 2025-10-01</p>
        </header>

        <main className="policy-page__content">
          <div className="policy-content">
            <section className="policy-section">
              <Heading level={2} className="policy-section__title">
                1. 基本方針
              </Heading>
              <p>
                当サイトは、ユーザーの個人情報保護の重要性を認識し、
                個人情報の保護に関する法律や関連する法令・規範を遵守し、
                適切な取り扱いを行います。
              </p>
            </section>

            <section className="policy-section">
              <Heading level={2} className="policy-section__title">
                2. 個人情報の収集について
              </Heading>
              <p>
                当サイトでは、以下の場合に個人情報を収集することがあります：
              </p>
              <ul>
                <li>お問い合わせフォームの送信時</li>
                <li>コメント投稿時</li>
                <li>メールマガジンの購読申し込み時</li>
                <li>その他、サービス提供のために必要な場合</li>
              </ul>
            </section>

            <section className="policy-section">
              <Heading level={2} className="policy-section__title">
                3. 個人情報の利用目的
              </Heading>
              <p>収集した個人情報は、以下の目的で利用いたします：</p>
              <ul>
                <li>お問い合わせへの対応</li>
                <li>サービスの提供・運営</li>
                <li>コンテンツの改善</li>
                <li>法的義務の履行</li>
              </ul>
            </section>

            <section className="policy-section">
              <Heading level={2} className="policy-section__title">
                4. Cookieの使用について
              </Heading>
              <p>
                当サイトでは、ユーザーの利便性向上のためにCookieを使用することがあります。
                Cookieを無効にする場合は、ブラウザの設定から変更可能です。
              </p>
            </section>

            <section className="policy-section">
              <Heading level={2} className="policy-section__title">
                5. アクセス解析ツール
              </Heading>
              <p>
                当サイトでは、Googleアナリティクス等のアクセス解析ツールを使用し、
                サイトの利用状況を分析しています。これらのツールはCookieを使用して
                情報を収集しますが、個人を特定する情報は含まれません。
              </p>
            </section>

            <section className="policy-section">
              <Heading level={2} className="policy-section__title">
                6. 第三者への提供
              </Heading>
              <p>
                当サイトは、法律に基づく場合や本人の同意がある場合を除き、
                収集した個人情報を第三者に提供することはありません。
              </p>
            </section>

            <section className="policy-section">
              <Heading level={2} className="policy-section__title">
                7. 個人情報の管理
              </Heading>
              <p>
                個人情報の正確性及び安全性確保のため、セキュリティに万全の注意を払い、
                個人情報の管理を行います。
              </p>
            </section>

            <section className="policy-section">
              <Heading level={2} className="policy-section__title">
                8. 個人情報の開示・訂正・削除
              </Heading>
              <p>
                ご本人からの個人情報の開示、訂正、削除等のお申し出があった場合には、
                本人確認の上、適切に対応いたします。
              </p>
            </section>

            <section className="policy-section">
              <Heading level={2} className="policy-section__title">
                9. プライバシーポリシーの変更
              </Heading>
              <p>
                本プライバシーポリシーの内容は、必要に応じて見直し、
                改善していく場合があります。変更した場合は、当サイトにて
                お知らせいたします。
              </p>
            </section>

            <section className="policy-section">
              <Heading level={2} className="policy-section__title">
                10. お問い合わせ
              </Heading>
              <p>
                本プライバシーポリシーに関するお問い合わせは、
                <a href="/contact" className="policy-link">
                  お問い合わせページ
                </a>
                からご連絡ください。
              </p>
            </section>

            <div className="policy-footer">
              <p>
                サイト運営者：{data.site.siteMetadata?.author?.name || 'Author'}
                <br />
                サイトURL：{siteUrl}
              </p>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export const Head: React.FC = () => (
  <SEO
    title="プライバシーポリシー"
    description="当サイトのプライバシーポリシーについて説明しています。個人情報の取り扱いに関する重要な情報をご確認ください。"
  />
);

export default PolicyPage;

export const query = graphql`
  query PolicyPageQuery {
    site {
      siteMetadata {
        title
        siteUrl
        author {
          name
        }
      }
    }
  }
`;
