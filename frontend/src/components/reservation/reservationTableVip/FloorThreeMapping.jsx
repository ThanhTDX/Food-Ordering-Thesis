import React, { useState } from "react";

import ImageMapper from "react-img-mapper";

import floor3 from "./floor3.png";

const highlightColor = "#a2e82a4d";
const URL = floor3;
const MAP = {
  name: "FLOOR3 - RESTAURANT1",
  areas: [
    {
      shape: "poly",
      coords: [
        449, 588, 449, 610, 438, 610, 438, 621, 418, 621, 418, 638, 438, 638,
        438, 648, 449, 649, 449, 670, 466, 670, 465, 649, 478, 648, 478, 638,
        498, 638, 498, 621, 478, 621, 478, 610, 466, 610, 466, 588,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F3-T1",
      id: "1",
      preFillColor: null,
    },
    {
      shape: "poly",
      coords: [
        252, 588, 252, 609, 242, 609, 241, 620, 221, 620, 220, 637, 241, 637,
        241, 648, 253, 648, 252, 669, 269, 669, 268, 648, 281, 648, 280, 637,
        301, 637, 301, 621, 280, 621, 281, 610, 269, 609, 269, 588,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F3-T2",
      id: "2",
      preFillColor: null,
    },
    {
      shape: "poly",
      coords: [
        55, 588, 55, 608, 44, 609, 45, 620, 23, 619, 24, 636, 44, 636, 44, 648,
        55, 647, 55, 669, 72, 668, 71, 648, 83, 647, 83, 636, 104, 636, 103,
        620, 83, 619, 83, 608, 72, 608, 72, 588,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F3-T3",
      id: "3",
      preFillColor: null,
    },
    {
      shape: "poly",
      coords: [
        55, 402, 56, 422, 45, 422, 45, 434, 24, 434, 24, 450, 44, 450, 45, 461,
        55, 461, 55, 482, 72, 482, 71, 460, 83, 461, 83, 450, 103, 450, 103,
        434, 84, 434, 82, 422, 72, 422, 72, 401,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F3-T4",
      id: "4",
      preFillColor: null,
    },
    {
      shape: "poly",
      coords: [
        56, 203, 56, 224, 44, 225, 44, 235, 23, 235, 23, 253, 44, 252, 44, 263,
        56, 263, 55, 285, 72, 283, 72, 263, 82, 262, 83, 252, 105, 252, 105,
        235, 84, 235, 83, 223, 72, 224, 71, 204,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F3-T5",
      id: "5",
      preFillColor: null,
    },
    {
      shape: "poly",
      coords: [
        55, 18, 55, 39, 44, 39, 45, 50, 23, 48, 23, 66, 44, 66, 45, 77, 55, 77,
        55, 98, 72, 98, 72, 78, 82, 77, 83, 67, 105, 66, 105, 49, 83, 50, 83,
        38, 72, 39, 71, 18,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F3-T6",
      id: "6",
      preFillColor: null,
    },
    {
      shape: "poly",
      coords: [
        250, 16, 250, 36, 239, 36, 239, 49, 219, 49, 219, 65, 240, 65, 239, 76,
        251, 76, 250, 97, 267, 97, 267, 77, 278, 77, 279, 65, 299, 65, 299, 48,
        278, 48, 278, 38, 267, 38, 266, 16,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F3-T7",
      id: "7",
      preFillColor: null,
    },
    {
      shape: "poly",
      coords: [
        448, 18, 448, 39, 437, 39, 437, 50, 417, 49, 416, 66, 437, 66, 437, 77,
        448, 77, 448, 98, 466, 98, 465, 77, 476, 77, 477, 66, 498, 66, 497, 50,
        476, 50, 476, 39, 465, 39, 465, 18,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F3-T8",
      id: "8",
      preFillColor: null,
    },
    {
      shape: "rect",
      coords: [159, 356, 360, 524],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "VIP Area",
      name: "VIP3",
      id: "9",
      preFillColor: null,
    },
    {
      shape: "rect",
      coords: [160, 191, 360, 356],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "VIP Area",
      name: "VIP4",
      id: "10",
      preFillColor: null,
    },
  ],
};

const FloorThreeMapping = ({ props }) => {
  // State to store the current state of the areas
  const { tables, setTables, vips, setVIPs, occupiedTables, occupiedVIPs } =
    props;
  const [currentMAP, setMAP] = useState(MAP);

  // Handle click event on areas
  const handleClick = (area) => {
    // Update the clicked area to a red color and keep it red

    const updatedAreas = currentMAP.areas.map((a) =>
      Number(a.id) === Number(area.id)
        ? {
            ...a,
            preFillColor:
              a.preFillColor === highlightColor ? null : highlightColor,
          } // Change the clicked area to red
        : a
    );

    if (area.title === "Table Area") {
      setTables((prevTables) => {
        if (prevTables.includes(area.name)) {
          return prevTables.filter((table) => table !== area.name);
        } else return [...prevTables, area.name];
      });
    } else if (area.title === "VIP Area") {
      setVIPs((prevVIPs) => {
        if (prevVIPs.includes(area.name)) {
          return prevVIPs.filter((vip) => vip !== area.name);
        } else return [...prevVIPs, area.name];
      });
    }

    setMAP({
      ...currentMAP,
      areas: updatedAreas,
    });
    // console.log(currentMAP);
  };

  return (
    <div className="d-flex justify-content-center">
      <ImageMapper
        src={URL}
        map={currentMAP}
        width={521}
        height={683}
        onClick={handleClick}
      />
    </div>
  );
};

export default FloorThreeMapping;
