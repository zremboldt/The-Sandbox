import React, { useState } from "react"
import Image from "./Image"
import Modal from "./Modal"

const Card = ({ name, videoId }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleClick = () => {
    setModalOpen(!modalOpen)
  }

  const imgName = () => {
    const spaceToDash = name.split(" ").join("-")
    const noComma = spaceToDash.split("'").join("")
    const lowerCase = noComma.toLowerCase()
    return `${lowerCase}.jpg`
  }

  return (
    <>
      <div className="card" onClick={handleClick}>
        <div className="cardImg">
          <Image imgName={imgName()} />
        </div>
        <p className="birdName">{name}</p>
      </div>

      {modalOpen && <Modal videoId={videoId} handleClick={handleClick} />}
    </>
  )
}

export default Card
