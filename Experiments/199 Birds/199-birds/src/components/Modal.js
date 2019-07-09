import React from "react"

const Modal = ({ handleClick, videoId }) => {
  return (
    <div className="modal">
      <div className="bgModal" onClick={handleClick}></div>
      <div className="ctrVideo">
        <iframe
          className="video"
          title={videoId}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&iv_load_policy=3&loop=1&playlist=${videoId}&modestbranding=1&rel=0`}
          frameBorder="0"
          allow="autoplay; encrypted-media;"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default Modal
