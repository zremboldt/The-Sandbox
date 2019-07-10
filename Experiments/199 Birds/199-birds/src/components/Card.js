import React, { useState } from "react";
import Image from "./Image";
import Modal from "./Modal";

const Card = ({ name, ...vidProps }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const formatImgName = () => {
    const spacesToDashes = name.split(" ").join("-");
    const noCommas = spacesToDashes.split("'").join("");
    const lowerCase = noCommas.toLowerCase();
    return `${lowerCase}.jpg`;
  };

  return (
    <>
      <div className="card" onClick={toggleModal}>
        <div className="cardImg">
          <Image imgName={formatImgName()} />
        </div>
        <p className="birdName">{name}</p>
      </div>

      {modalOpen && <Modal {...vidProps} toggleModal={toggleModal} />}
    </>
  );
};

export default Card;
