import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  const post = data.sanityProducts
  console.log(post)
  return (
    <Layout>
      <div style={{ margin: '5rem 0' }}>
        <h2>{post.name}</h2>
        <p>{post.valueStatement}</p>
        <p>{post.startingPrice}</p>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    sanityProducts(slug: { eq: $slug }) {
      name
      valueStatement
      startingPrice
      slug {
        current
      }
    }
  }
`










// export const query = graphql`
//   query($slug: String!) {
//     markdownRemark(fields: { slug: { eq: $slug } }) {
//       html
//       frontmatter {
//         title
//       }
//     }
//   }
// `
