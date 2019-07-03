import React from "react"

const Modal = ({ handleClick, videoId }) => {
  return (
    <div className="modal">
      <div className="bgModal" onClick={handleClick}></div>
      <div className="ctrVideo">
        <iframe
          className="video"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameborder="0"
          allow="autoplay; encrypted-media;"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  )
}

export default Modal
