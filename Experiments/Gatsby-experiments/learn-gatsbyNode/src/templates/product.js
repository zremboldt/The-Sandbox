import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  const product = data.sanityProducts
  console.log(product)
  return (
    <Layout>
      <SEO title={product.name} />
      <section className="ctr__heroProductContent">
        <div className="wrap">
          <div className="heroProductContent">
            <h2>{product.name}</h2>
            <h6>{product.valueStatement}</h6>
            <p>
              <strong>Starting at ${product.startingPrice}</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="ctr__heroBackgroundImage">
        <Image fluid={product.heroBackgroundImage.asset.fluid} />
      </section>

      <section className="ctr__heroProductImage">
        <div className="heroProductImage">
          <Image fluid={product.heroProductImage.asset.fluid} />
        </div>
      </section>

      <section className="ctr__productFeatures wrap">
        <div className="productFeaturesGrid">
          <div className="feature"></div>
          <div className="feature"></div>
          <div className="feature"></div>
          <div className="feature"></div>
          <div className="feature"></div>
          <div className="feature"></div>
        </div>
      </section>
    </Layout>
  )
}

export const productQuery = graphql`
  query($slug: String!) {
    sanityProducts(slug: { current: { eq: $slug } }) {
      name
      valueStatement
      startingPrice
      slug {
        current
      }
      heroBackgroundImage {
        asset {
          fluid {
            ...GatsbySanityImageFluid
          }
        }
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
`
