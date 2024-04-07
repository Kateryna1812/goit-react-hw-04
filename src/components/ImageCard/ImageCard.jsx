// import React from "react";
import css from "./ImageCard.module.css";

const ImageCard = ({ photo, handleImageClick }) => {
  return (
    <div>
      <img
        onClick={() => handleImageClick(photo)}
        className={css.image}
        src={photo.urls.small}
        alt={photo.alt_description}
      />
    </div>
  );
};

export default ImageCard;