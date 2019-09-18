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
      <div className="wrap productGrid">

        {data.allSanityProducts.edges.map(({ node }, i) => (
          <Link className="product" to={`/products/${node.slug.current}`} key={i}>
            <div className="ctr__productImage">
              <Image fluid={node.heroProductImage.asset.fluid} />
            </div>
            <div className="card">
              <h2 style={{ marginBottom: "8px" }}>{node.name}</h2>
              <p className="valueStatement" style={{ marginBottom: "4px" }}>{node.valueStatement}</p>
            </div>
          </Link>
        ))}
      </div>
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
