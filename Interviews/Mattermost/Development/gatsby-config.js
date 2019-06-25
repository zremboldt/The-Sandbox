module.exports = {
  siteMetadata: {
    title: `Hello Mattermost`,
    description: `Just put together a quick "hello, Mattermost! Draft me for your team!" page.`,
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
        name: `Hello Mattermost`,
        short_name: `Hello Mattermost`,
        start_url: `/`,
        background_color: `#3685fc`,
        theme_color: `#3685fc`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
