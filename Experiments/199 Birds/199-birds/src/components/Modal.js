import React from "react"

const Modal = ({ handleClick, video }) => {
  return (
    <div className="bgModal" onClick={handleClick}>
      <div className="ctrVideo">
        <p>{video}</p>
      </div>
    </div>
  )
}

export default Modal
