import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "gatsby-image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <SEO title="Home" />

      {data.allSanityProducts.edges.map(({ node }, i) => (
        <div key={i}>
          <div style={{ maxWidth: `300px`, margin: `4rem 0 0` }}>
            <Image fluid={node.heroProductImage.asset.fluid} />
          </div>
          <h2 style={{ marginBottom: "8px" }}>{node.name}</h2>
          <p style={{ marginBottom: "4px" }}>{node.valueStatement}</p>
          <p>Starting at ${node.startingPrice}</p>
        </div>
      ))}
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allSanityProducts(sort: { fields: startingPrice, order: ASC }) {
      edges {
        node {
          name
          valueStatement
          startingPrice
          slug {
            current
          }
          # heroProductImage {
          #   asset {
          #     url
          #   }
          # }
          heroProductImage {
            asset {
              fluid {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
`
