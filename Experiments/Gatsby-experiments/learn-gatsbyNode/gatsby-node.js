// Learned about this here: https://www.gatsbyjs.org/tutorial/part-seven/

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Creating slugs for all my markdown pages.
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // **Note:** The graphql function call returns a Promise
  // Using the graphql function to query the markdown slugs we created above ↑

  /////////////////
  // Blog Posts
  /////////////////
  const blogPostSlugs = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  blogPostSlugs.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      // When creating a page, you need to specify which component to use.
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
  // console.log(JSON.stringify(result, null, 2))

  /////////////////
  // Product Pages
  /////////////////
  // ne: short for not equal
  const productSlugs = await graphql(`
    {
      allSanityProducts(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (productSlugs.errors) {
    console.log(productSlugs.errors)
    throw productSlugs.errors
  }

  const products = productSlugs.data.allSanityProducts.edges || []
  products.forEach(({ node }) => {
    const path = `/products/${node.slug.current}`

    createPage({
      path,
      component: require.resolve("./src/templates/product.js"),
      context: { slug: node.slug.current },
    })
  })
}

//
//
//


