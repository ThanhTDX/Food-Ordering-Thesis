import React from "react";
import { Image } from "react-bootstrap"; // Importing the Image component

const OpacityImage = ({ src, alt, opacity }) => {
  // You can set a default opacity or use props
  const style = {
    opacity: opacity || 0.5, // Default opacity to 0.5 if not specified
    transition: "opacity 0.3s ease-in-out", // Optional: for smooth transitions
  };

  return <Image src={src} alt={alt} style={style} fluid />;
};

export default OpacityImage;
