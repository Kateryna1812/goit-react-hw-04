// import React, { useEffect, useState } from "react";
import ImageCard from "../ImageCard/ImageCard";

import css from "./ImageGallery.module.css";

const ImageGallery = ({ gallery, handleImageClick }) => {
  return (
    <>
      {gallery && (
        <ul className={css.photolist}>
          {gallery.map((photo) => (
            <li key={photo.id}>
              <ImageCard photo={photo} handleImageClick={handleImageClick} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ImageGallery;