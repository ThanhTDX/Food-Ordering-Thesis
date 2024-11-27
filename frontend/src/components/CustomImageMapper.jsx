import React from "react";
import ImgMapper from "react-img-mapper";

const CustomImageMapper = ({ name, url, map }) => {
  const URL =
    "https://raw.githubusercontent.com/img-mapper/react-docs/master/src/assets/example.jpg";
  const MAP = {
    name: "image-map",
    areas: [
      {
        shape: "poly",
        coords: [
          520.0646766169153, 393.0348258706467, 85.23880597014923,
          378.6069651741293, 637, 479,
        ],
        fillColor: "#eab54d4d",
        strokeColor: "black",
        title: "Hardwood Area",
        name: "1",
        id: "469f9800-c45a-483f-b13e-bd24f3fb79f4",
      },
    ],
  };
  return <ImgMapper src={URL} map={MAP} />;
};

export default CustomImageMapper;
