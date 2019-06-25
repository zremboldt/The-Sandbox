module.exports = {
  siteMetadata: {
    title: `I Love Root`,
    description: `Just put together a quick "hello, Root! Draft me for your team!" page.`,
    author: `@zremboldt`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `I Love Root`,
        short_name: `I<3Root`,
        start_url: `/`,
        background_color: `#FF5715`,
        theme_color: `#FF5715`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
