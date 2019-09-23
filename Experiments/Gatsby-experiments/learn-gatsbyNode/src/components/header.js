import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import hustlerLogo from "../images/HustlerLogo_OnWhite.svg"

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const data = useStaticQuery(graphql`
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
  `)

  console.log(data)
  return (
    <header className="header">
      <div className="wrap ctr__header">
        <Link to="/">
          <img className="hustlerLogo" src={hustlerLogo} alt="" />
        </Link>
        <nav>
          <span
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="navItem"
          >
            Products
          </span>
          <Link to="/blog/">Blog</Link>
          {dropdownOpen && (
            <div className="dropdown__products">
              <div className="dropdown__products--wrap">
                {data.allSanityProducts.edges.map(({ node }, i) => (
                  <Link
                    to={`/products/${node.slug.current}`}
                    className="product"
                    key={i}
                  >
                    <Image fluid={node.heroProductImage.asset.fluid} />
                    <h5>{node.name}</h5>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header

// export const query = useStaticQuery(graphql`
//   query {
//     allSanityProducts(sort: { fields: startingPrice, order: ASC }) {
//       edges {
//         node {
//           name
//           valueStatement
//           startingPrice
//           slug {
//             current
//           }
//           heroProductImage {
//             asset {
//               fluid {
//                 ...GatsbySanityImageFluid
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `)
