import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as faStarSolid,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";


function StarRating( {rating , size} ) {
  return (
    <div className="d-flex flex-row">
      <div className="text-warning">
        <span>
          {rating >= 1 && (
            <FontAwesomeIcon icon={faStarSolid} size={size} />
          )}
          {rating >= 0 && rating < 1 && (
            <FontAwesomeIcon icon={faStarHalfStroke} size={size} />
          )}
        </span>
        <span>
          {rating >= 2 && (
            <FontAwesomeIcon icon={faStarSolid} size={size} />
          )}
          {rating >= 1.5 && rating < 2 && (
            <FontAwesomeIcon icon={faStarHalfStroke} size={size} />
          )}
          {rating < 1.5 && (
            <FontAwesomeIcon icon={faStarRegular} size={size} />
          )}
        </span>
        <span>
          {rating >= 3 && (
            <FontAwesomeIcon icon={faStarSolid} size={size} />
          )}
          {rating >= 2.5 && rating < 3 && (
            <FontAwesomeIcon icon={faStarHalfStroke} size={size} />
          )}
          {rating < 2.5 && (
            <FontAwesomeIcon icon={faStarRegular} size={size} />
          )}
        </span>
        <span>
          {rating >= 4 && (
            <FontAwesomeIcon icon={faStarSolid} size={size} />
          )}
          {rating >= 3 && rating < 3.5 && (
            <FontAwesomeIcon icon={faStarHalfStroke} size={size} />
          )}
          {rating < 3 && (
            <FontAwesomeIcon icon={faStarRegular} size={size} />
          )}
        </span>
        <span>
          {rating >= 5 && (
            <FontAwesomeIcon icon={faStarSolid} size={size} />
          )}
          {rating >= 4 && rating < 4.5 && (
            <FontAwesomeIcon icon={faStarHalfStroke} size={size} />
          )}
          {rating < 4 && (
            <FontAwesomeIcon icon={faStarRegular} size={size} />
          )}
        </span>
      </div>
    </div>
  );
}

export default StarRating