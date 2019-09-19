import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Blog" />
      <section className="wrap marTop10">
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>

        {data.allMarkdownRemark.edges.map(({ node }, i) => (
          <div key={i} id={node.id} style={{ marginBottom: '2rem', maxWidth: '76rem' }}>
            <Link to={node.fields.slug}>
              <h2>
                <span>{node.frontmatter.title}</span>
                <span style={{ color: "#999" }}>
                  {" "}
                  – {node.frontmatter.date}
                </span>
              </h2>
              <p>{node.excerpt}</p>
            </Link>
          </div>
        ))}
      </section>
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
