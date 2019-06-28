require("dotenv").config()

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-airtable",
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: "appOahLiv25ObIMbx",
            tableName: "Items",
            tableLinks: ["Company"],
          },
          {
            baseId: "appOahLiv25ObIMbx",
            tableName: "Companies",
            tableLinks: ["Items"],
          },
        ],
      },
    },
  ],
}
