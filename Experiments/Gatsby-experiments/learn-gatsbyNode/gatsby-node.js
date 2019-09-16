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
  const result = await graphql(`
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

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
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
  console.log(JSON.stringify(result, null, 2))
}

// exports.createPages = async ({graphql, actions}) => {
//   const {createPage}
// }
