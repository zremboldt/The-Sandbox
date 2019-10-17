module.exports = {
  siteMetadata: {
    title: `Root Car Insurance | Low rates for good drivers`,
    description: `The Root app helps you get a car insurance rate based on how you actually drive. Good drivers save up to 52%. From customizing your coverage to filing claims, the Root app makes auto insurance easy—and fair.`,
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
        name: `root-car-insurance`,
        short_name: `root-insurance`,
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
};
