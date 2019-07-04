import React, { useState } from "react"
import Image from "./Image"
import Modal from "./Modal"

const Card = ({ img, name, videoId }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleClick = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <>
      <div className="card" onClick={handleClick}>
        <div className="cardImg">
          <Image imgName={img} />
        </div>
        <div className="birdName">
          <p>{name}</p>
        </div>
      </div>

      {modalOpen && <Modal videoId={videoId} handleClick={handleClick} />}
    </>
  )
}

export default Card
