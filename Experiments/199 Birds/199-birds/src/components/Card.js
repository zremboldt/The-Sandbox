import React from "react"
// import Image from "../components/image"
import Img from "gatsby-image"

const Card = props => {
  const { id } = props.edge.node
  // console.log(props.edge.node.id)
  return (
    <div className="card">
      <div className="cardImg">
        {/* <Image /> */}
        {/* <Img fluid={img ? img.childImageSharp.fluid : {}} alt={name} /> */}
        {/* <Img fluid={id.fluid} backgroundColor={"#eeeeee"} /> */}
      </div>
      <figcaption>
        {/* <h3>{name}</h3> */}
        {/* <Copy>{copy}</Copy> */}
      </figcaption>
    </div>
  )
}

// const Card = ({ name, img }) => {
//   return (
//     <div className="card">
//       <div className="cardImg">
//         {/* <Image /> */}
//         {/* <Img fluid={img ? img.childImageSharp.fluid : {}} alt={name} /> */}
//         <Img fluid={img.fluid} backgroundColor={"#eeeeee"} />
//       </div>
//       <figcaption>
//         <h3>{name}</h3>
//         {/* <Copy>{copy}</Copy> */}
//       </figcaption>
//     </div>
//   )
// }

export default Card

/* <div
        className="image"
        // style={{ backgroundImage: `url(../images/${img})` }}
      >
        <Image />
      </div> */
