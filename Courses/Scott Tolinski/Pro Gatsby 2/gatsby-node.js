// Implement Gatsby's Node APIs in this file.
// See: https://www.gatsbyjs.org/docs/node-apis/

// path is part of Node so we don't need to install it
const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
      }
    `).then(results => {
      results.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: `/posts${node.frontmatter.path}`,
          component: path.resolve('./src/components/postLayout.js'),
          context: {
            slug: node.frontmatter.path,
          },
        });
      });
      resolve();
    });
  });
};
