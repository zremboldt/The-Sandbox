import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import Layout from "../components/layout"

export default ({ data }) => {
  const product = data.sanityProducts
  console.log(product)
  return (
    <Layout>
      <section className="ctr__heroBackgroundImage">
        <Image fluid={product.heroBackgroundImage.asset.fluid} />
      </section>
      <section className="ctr__heroProductImage">
        <div className="heroProductImage"><Image fluid={product.heroProductImage.asset.fluid} /></div>
      </section>
      <div className="productPage wrap">
        <h2>{product.name}</h2>
        <p>{product.valueStatement}</p>
        <p>${product.startingPrice}</p>
      </div>
      {/* <section className="features wrap">
        
      </section> */}
    </Layout>
  )
}

export const productQuery = graphql`
  query($slug: String!) {
    sanityProducts(slug: {current: {eq: $slug}}) {
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






