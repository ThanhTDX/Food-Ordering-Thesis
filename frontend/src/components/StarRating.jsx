import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as faStarSolid,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";


function StarRating( {item , size} ) {
  return (
    <div className="d-flex flex-row">
      <div className="text-warning mb-1 me-2">
        <span>
          {item.rating >= 1 && (
            <FontAwesomeIcon icon={faStarSolid} size={size} />
          )}
          {item.rating >= 0 && item.rating < 1 && item.num_of_rating !== 0 && (
            <FontAwesomeIcon icon={faStarHalfStroke} size={size} />
          )}
          {item.num_of_rating === 0 && (
            <FontAwesomeIcon icon={faStarRegular} size={size} />
          )}
        </span>
        <span>
          {item.rating >= 2 && (
            <FontAwesomeIcon icon={faStarSolid} size={size} />
          )}
          {item.rating >= 1.5 && item.rating < 2 && (
            <FontAwesomeIcon icon={faStarHalfStroke} size={size} />
          )}
          {item.rating < 1.5 && (
            <FontAwesomeIcon icon={faStarRegular} size={size} />
          )}
        </span>
        <span>
          {item.rating >= 3 && (
            <FontAwesomeIcon icon={faStarSolid} size={size} />
          )}
          {item.rating >= 2.5 && item.rating < 3 && (
            <FontAwesomeIcon icon={faStarHalfStroke} size={size} />
          )}
          {item.rating < 2.5 && (
            <FontAwesomeIcon icon={faStarRegular} size={size} />
          )}
        </span>
        <span>
          {item.rating >= 4 && (
            <FontAwesomeIcon icon={faStarSolid} size={size} />
          )}
          {item.rating >= 3 && item.rating < 3.5 && (
            <FontAwesomeIcon icon={faStarHalfStroke} size={size} />
          )}
          {item.rating < 3 && (
            <FontAwesomeIcon icon={faStarRegular} size={size} />
          )}
        </span>
        <span>
          {item.rating >= 5 && (
            <FontAwesomeIcon icon={faStarSolid} size={size} />
          )}
          {item.rating >= 4 && item.rating < 4.5 && (
            <FontAwesomeIcon icon={faStarHalfStroke} size={size} />
          )}
          {item.rating < 4 && (
            <FontAwesomeIcon icon={faStarRegular} size={size} />
          )}
        </span>
        <span className="menu-item--list-rating ms-2">
          {item.num_of_rating}
        </span>
      </div>
    </div>
  );
}

export default StarRating