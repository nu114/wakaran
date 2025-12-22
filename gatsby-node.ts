/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

import path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import logger from './src/utils/logger';
import type { GatsbyNode } from 'gatsby';

const blogPostTemplate = path.resolve(`./src/templates/BlogPost.tsx`)
const categoryTemplate = path.resolve(`./src/templates/Category.tsx`)

interface CreatePagesQueryResult {
  allMicrocmsBlogs: {
    nodes: {
      id: string;
      category: {
        id: string;
        name: string;
      } | null;
    }[];
  };
  allMicrocmsCategories: {
    nodes: {
      name: string;
      id: string;
    }[];
  };
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  logger.info('Starting createPages process')

  try {
    const result = await graphql<CreatePagesQueryResult>(`
      {
        allMicrocmsBlogs(sort: { createdAt: ASC }, limit: 1000) {
          nodes {
            id
            category {
              id
              name
            }
          }
        }
        allMicrocmsCategories {
          nodes {
            name
            id
          }
        }
      }
    `)

    if (result.errors) {
      logger.error('GraphQL query errors:', result.errors)
      reporter.panicOnBuild(
        `There was an error loading your blog posts`,
        result.errors
      )
      return
    }

    const posts = result.data?.allMicrocmsBlogs.nodes || []
    const categories = result.data?.allMicrocmsCategories.nodes || []

    // ブログ記事から実際に使用されているカテゴリIDを抽出
    const usedCategories = new Map()
    posts.forEach(post => {
      if (post.category) {
        usedCategories.set(post.category.id, post.category.name)
      }
    })

    logger.info(`Found ${posts.length} blog posts and ${categories.length} categories`)
    logger.info(`Used categories:`, Array.from(usedCategories.entries()))

    // Create blog posts pages for microCMS
    if (posts.length > 0) {
      posts.forEach((post, index) => {
        const previousPostId = index === 0 ? null : posts[index - 1].id
        const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id
        
        logger.debug(`Creating blog post page: /blog/${post.id}`)
        
        createPage({
          path: `/blog/${post.id}`,
          component: blogPostTemplate,
          context: {
            id: post.id,
            previousPostId,
            nextPostId,
          },
        })
      })
      logger.info(`Created ${posts.length} blog post pages`)
    }

    // Create category pages using actual blog category IDs
    if (usedCategories.size > 0) {
      Array.from(usedCategories.entries()).forEach(([categoryId, categoryName]) => {
        logger.debug(`Creating category page: /category/${categoryId} (${categoryName})`)
        
        createPage({
          path: `/category/${categoryId}`,
          component: categoryTemplate,
          context: {
            id: categoryId,
            name: categoryName,
          },
        })
      })
      logger.info(`Created ${usedCategories.size} category pages`)
    }

    logger.info('createPages process completed successfully')

  } catch (error) {
    logger.error('Error in createPages:', error)
    reporter.panicOnBuild('Error in createPages', error)
  }
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
