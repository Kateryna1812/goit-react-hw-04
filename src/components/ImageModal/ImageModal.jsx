// import React from "react";
import ReactModal from "react-modal";
import css from "./ImageModal.module.css";

const ImageModal = ({ isOpen, closeModal, imageUrl, alt }) => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return (
    <div className={css.modalBlock}>
      <ReactModal
        className={css.modalContent}
        overlayClassName={css.modalOverlay}
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Selected Image"
        ariaHideApp={false}
      >
        <img src={imageUrl} alt={alt} className={css.image} />
        <button onClick={closeModal}>Close</button>
      </ReactModal>
    </div>
  );
};

export default ImageModal;