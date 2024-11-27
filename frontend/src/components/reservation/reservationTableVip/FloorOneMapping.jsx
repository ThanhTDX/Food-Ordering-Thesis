import React, { useEffect, useState } from "react";
import ImageMapper from "react-img-mapper";

import floor1 from "./floor1.png";

const highlightColor = "#a2e82a4d";
const URL = floor1;
const MAP = {
  name: "FLOOR1 - RESTAURANT1",
  areas: [
    {
      shape: "poly",
      coords: [
        63, 207, 63, 227, 53, 229, 53, 241, 32, 241, 31, 258, 53, 258, 53, 268,
        65, 268, 65, 288, 80, 289, 80, 268, 92, 268, 92, 258, 112, 258, 114,
        239, 92, 239, 92, 229, 82, 231, 82, 207,
      ],
      fillColor: highlightColor,
      preFillColor: null,
      strokeColor: "black",
      title: "Table Area",
      name: "F1-T1",
      id: "1",
    },
    {
      shape: "poly",
      coords: [
        180, 206, 180, 227, 167, 227, 167, 238, 149, 238, 149, 258, 167, 258,
        167, 270, 180, 270, 180, 290, 199, 290, 200, 271, 211, 271, 211, 258,
        230, 258, 231, 238, 211, 238, 211, 228, 199, 228, 199, 206,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F1-T2",
      id: "2",
      preFillColor: null,
    },
    {
      shape: "poly",
      coords: [
        297, 207, 297, 228, 286, 228, 286, 240, 266, 240, 266, 258, 286, 258,
        286, 270, 297, 270, 298, 290, 316, 290, 316, 270, 328, 270, 328, 258,
        348, 258, 348, 240, 326, 240, 326, 228, 316, 228, 316, 208,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F1-T3",
      id: "3",
      preFillColor: null,
    },
    {
      shape: "poly",
      coords: [
        70, 345, 70, 368, 45, 368, 45, 380, 22, 380, 22, 402, 47, 402, 45, 415,
        70, 415, 70, 440, 139, 440, 139, 415, 162, 415, 162, 402, 187, 402, 187,
        382, 162, 382, 162, 368, 139, 368, 139, 345,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F1-T4",
      id: "4",
      preFillColor: null,
    },
    {
      shape: "poly",
      coords: [
        246, 346, 246, 373, 222, 373, 222, 383, 197, 383, 197, 403, 221, 403,
        221, 418, 246, 418, 247, 442, 314, 442, 314, 418, 339, 418, 339, 405,
        363, 406, 363, 385, 338, 385, 338, 371, 316, 371, 316, 346,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F1-T5",
      id: "5",
      preFillColor: null,
    },
    {
      shape: "poly",
      coords: [
        65, 502, 65, 522, 53, 522, 53, 534, 33, 534, 33, 551, 53, 551, 53, 561,
        65, 561, 65, 583, 80, 583, 80, 561, 92, 563, 92, 551, 114, 551, 114,
        534, 92, 534, 92, 524, 80, 524, 80, 502,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F1-T6",
      id: "6",
      preFillColor: null,
    },
    {
      shape: "poly",
      coords: [
        182, 503, 182, 523, 170, 523, 170, 535, 150, 535, 150, 551, 170, 551,
        170, 561, 182, 561, 182, 583, 197, 583, 197, 561, 209, 561, 209, 550,
        229, 551, 229, 535, 209, 535, 209, 523, 197, 523, 197, 503,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F1-T7",
      id: "7",
      preFillColor: null,
    },
    {
      shape: "poly",
      coords: [
        297, 502, 297, 522, 287, 522, 287, 534, 266, 534, 266, 551, 287, 551,
        287, 561, 297, 561, 297, 581, 314, 581, 314, 561, 326, 561, 326, 551,
        346, 551, 346, 534, 326, 534, 326, 522, 314, 524, 314, 502,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "VIP Area",
      name: "F1-T8",
      id: "8",
      preFillColor: null,
    },
  ],
};

const FloorOneMapping = ({ props }) => {
  // State to store the current state of the areas
  const { tables, setTables, vips, setVIPs, occupiedTables, occupiedVIPs } =
    props;
  const [currentMAP, setMAP] = useState(MAP);

  // Handle click event on areas
  const handleClick = (area) => {
    // Check input areas + tables (For debugging)
    // console.log(area, tables);
    // Update the clicked area to a red color and keep it red
    const updatedAreas = currentMAP.areas.map((a) =>
      Number(a.id) === Number(area.id) || tables.includes(area.name)
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

    // Check the current map (for debugging)
    // console.log(currentMAP);
  };

  return (
    <div className="d-flex justify-content-center">
      <ImageMapper
        src={URL}
        map={currentMAP}
        width={523}
        height={680}
        onClick={handleClick}
      />
    </div>
  );
};

export default FloorOneMapping;
