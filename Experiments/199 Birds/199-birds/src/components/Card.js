import React from "react"
import Image from "./Image"

const Card = ({ img, name }) => {
  return (
    <div className="card">
      <div className="cardImg">
        <Image imgName={img} />
      </div>
      <div className="birdName">
        <h3>{name}</h3>
      </div>
    </div>
  )
}

export default Card
