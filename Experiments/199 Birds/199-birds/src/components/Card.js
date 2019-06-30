import React from "react"
import Image from "../components/image"

const Card = ({ name, img }) => {
  return (
    <div className="card">
      <div className="cardImg">
        <Image />
      </div>
      <div className="info">
        <p className="name">{name}</p>
      </div>
    </div>
  )
}

export default Card

{
  /* <div
        className="image"
        // style={{ backgroundImage: `url(../images/${img})` }}
      >
        <Image />
      </div> */
}
