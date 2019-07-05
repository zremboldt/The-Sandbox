import React from "react"

const Modal = ({ handleClick, videoId }) => {
  return (
    <div className="modal">
      <div className="bgModal" onClick={handleClick}></div>
      <div className="ctrVideo">
        <iframe
          className="video"
          title={videoId}
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="autoplay; encrypted-media;"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default Modal
