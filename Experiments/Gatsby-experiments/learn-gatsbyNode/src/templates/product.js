import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  const post = data.sanityProducts
  console.log(post)
  return (
    <Layout>
      {/* <h1>{post.frontmatter.title}</h1> */}
      {/* <div dangerouslySetInnerHTML={{ __html: post.html }} /> */}
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    sanityProducts(filter: { slug: { eq: $slug } }) {
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
