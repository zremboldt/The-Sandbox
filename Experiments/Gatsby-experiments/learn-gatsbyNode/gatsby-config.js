module.exports = {
  siteMetadata: {
    title: `Hustler`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "tl9kjrfn",
        dataset: "production",
        // a token with read permissions is required
        // if you have a private dataset
        token:
          "skA9vTDW4clkP2KG5lnVkDmAWE7EVQR5d8kB5I6LuEuihWIRca562w7MjbkpPB45qvOL0LtDT9JFZ4y31wGss8EOwaTjXaqgDlCWGVvdJrBQtUTX74N7xqVDsUWv8CzInwf3nznMeiCEns4x51Km95sJu07ykKZPrFvbw8LsgweJTLcdgtLq",
        overlayDrafts: true,
        watchMode: true,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#282c34`,
        theme_color: `#282c34`,
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
