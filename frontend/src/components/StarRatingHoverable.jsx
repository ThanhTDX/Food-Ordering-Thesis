import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faStar as faStarRegular,
  
} from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

const StarRatingHoverable = ({size}) => {
  // State to track the hovered star index
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [fixedIndex, setFixedIndex] = useState(-1)
  
  // Array of 5 stars (can be used to dynamically generate the icons)
  const totalStars = 5

  //
  const fixedOrHover = (index) => {
    // I ChatGPT this shit (and it's chatgpt4o)
    // When hovering, use hoveredIndex to determine which stars are filled
    if (hoveredIndex >= 0) {
      return index <= hoveredIndex ? faStarSolid : faStarRegular;
    }
    // If not hovering and there is a fixedIndex, keep it fixed to that value
    if (fixedIndex >= 0) {
      return index <= fixedIndex ? faStarSolid : faStarRegular;
    }
    // If not hovering and no fixedIndex, reset to 0 (no stars selected)
    return faStarRegular;
  }
  return (
    <>
      {[...Array(totalStars)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={fixedOrHover(index)} // Render faStarSolid for hovered stars
          size={size}
          // Set fixedIndex on click
          onClick={() => setFixedIndex(index)}
          // Set hoveredIndex on mouse enter and reset on mouse leave
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(-1)}
        />
      ))}
    </>
  );
}

export default StarRatingHoverable