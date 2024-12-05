import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({height, width}) => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        height: `${height}px`,
        width: `${width}px`,
        margin: "auto",
        display: "block",
      }}
    >
      <span className="sr-only"></span>
    </Spinner>
  );
};

export default Loader;
