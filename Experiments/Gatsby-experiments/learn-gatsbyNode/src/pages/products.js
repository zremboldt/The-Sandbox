import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <SEO title="Home" />

      {data.allSanityProducts.edges.map(({ node }, i) => (
        <div key={i}>
          <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
            <p>{node.heroProductImage.asset.path}</p>
            <img src={node.heroProductImage.asset.path} alt="" />
          </div>
          <h2>{node.name}</h2>
          <p>{node.valueStatement}</p>
        </div>
      ))}
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allSanityProducts {
      edges {
        node {
          name
          valueStatement
          startingPrice
          slug {
            current
          }
          heroProductImage {
            asset {
              path
            }
          }
        }
      }
    }
  }
`
