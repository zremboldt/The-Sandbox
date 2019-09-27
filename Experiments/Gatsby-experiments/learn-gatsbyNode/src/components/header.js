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
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="btn navItem"
          >
            Products
          </button>
          <Link to="/blog/">Blog</Link>
          {dropdownOpen && (
            <div className="dropdown__products">
              <div className="typeSelection">
                <div className="typeSelectionWrap">
                  <button className="btn btn__select btn__select--Residential">Residential Zero-Turns</button>
                  <button className="btn btn__select btn__select--Commercial">Commercial Zero-Turns</button>
                  <button className="btn btn__select btn__select--UtilityVehicles">Utility Vehicles</button>
                  <button className="btn btn__select btn__select--PowerEquipment">Power Equipment</button>
                </div>
              </div>

              <div className="productsWrap">
                <div className="productsGrid">
                  {data.allSanityProducts.edges.map(({ node }, i) => (
                    <Link
                      to={`/products/${node.slug.current}`}
                      className="product"
                      key={i}
                    >
                      <Image fluid={node.heroProductImage.asset.fluid} />
                      <h5>{node.name}</h5>
                      <p>Starting at ${node.startingPrice}</p>
                    </Link>
                  ))}
                </div>
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
