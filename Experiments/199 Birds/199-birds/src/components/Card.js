import React, { useState } from "react"
import Image from "./Image"
import Modal from "./Modal"

const Card = ({ img, name, video }) => {
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
          <h3>{name}</h3>
        </div>
      </div>

      {modalOpen && <Modal video={video} handleClick={handleClick} />}
    </>
  )
}

export default Card
