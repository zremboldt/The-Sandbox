import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <SEO title="Home" />
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }, i) => (
        <div key={i} id={node.id}>
          <Link
            to={node.fields.slug}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h3 style={{ marginBottom: "6px" }}>
              {node.frontmatter.title}
              <span style={{ color: "#999" }}> – {node.frontmatter.date}</span>
            </h3>
            <p>{node.excerpt}</p>
          </Link>
        </div>
      ))}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          wordCount {
            words
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`
