import React from "react"
import Img from "gatsby-image"

const Card = ({ image }) => {
  return (
    <div className="card">
      <div className="cardImg">
        <Img fluid={image.childImageSharp.fluid} alt="image name here" />
      </div>
      <figcaption>
        {/* <h3>{name}</h3> */}
        {/* <Copy>{copy}</Copy> */}
      </figcaption>
    </div>
  )
}

export default Card
