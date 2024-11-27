import React, { useState } from "react";
import ImageMapper from "react-img-mapper";
import floor2 from "./floor2.png";

const highlightColor = "#a2e82a4d";
const URL = floor2;
const MAP = {
  name: "FLOOR2 - RESTAURANT1",
  areas: [
    {
      shape: "poly",
      coords: [
        81, 167, 81, 188, 59, 188, 60, 199, 37, 199, 37, 217, 60, 217, 60, 229,
        81, 229, 81, 251, 141, 251, 141, 229, 162, 229, 163, 218, 184, 219, 184,
        200, 163, 200, 163, 189, 142, 189, 142, 167,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Hardwood Area",
      name: "F2-T1",
      id: "1",
      preFillColor: null,
    },
    {
      shape: "poly",
      coords: [
        239, 168, 239, 191, 215, 191, 215, 201, 195, 201, 195, 218, 216, 218,
        216, 230, 238, 229, 239, 252, 298, 251, 298, 230, 319, 230, 320, 219,
        341, 219, 341, 201, 319, 201, 320, 190, 298, 190, 298, 168,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F2-T2",
      id: "2",
      preFillColor: null,
    },
    {
      shape: "poly",
      coords: [
        79, 293, 79, 315, 56, 315, 57, 324, 36, 324, 35, 341, 57, 341, 57, 353,
        78, 353, 79, 375, 138, 375, 137, 354, 159, 353, 159, 342, 181, 343, 181,
        325, 159, 325, 159, 315, 138, 315, 138, 293,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F2-T3",
      id: "3",
      preFillColor: null,
    },
    {
      shape: "poly",
      coords: [
        236, 294, 236, 315, 215, 316, 215, 326, 193, 325, 193, 343, 215, 343,
        215, 354, 236, 354, 236, 376, 296, 377, 295, 354, 316, 355, 316, 344,
        338, 344, 338, 326, 316, 326, 316, 316, 296, 316, 295, 294,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F2-T4",
      id: "4",
      preFillColor: null,
    },
    {
      shape: "poly",
      coords: [
        79, 410, 78, 432, 58, 432, 57, 441, 35, 441, 35, 459, 56, 459, 56, 470,
        79, 470, 79, 492, 138, 492, 138, 470, 159, 470, 159, 460, 182, 460, 182,
        442, 159, 442, 159, 432, 138, 431, 138, 410,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F2-T5",
      id: "5",
      preFillColor: null,
    },
    {
      shape: "poly",
      coords: [
        236, 410, 235, 433, 213, 433, 213, 442, 192, 443, 192, 460, 214, 461,
        214, 471, 235, 471, 235, 493, 295, 494, 295, 471, 315, 472, 316, 461,
        338, 461, 338, 443, 316, 444, 315, 433, 295, 432, 295, 411,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F2-T6",
      id: "6",
      preFillColor: null,
    },
    {
      shape: "poly",
      coords: [
        459, 404, 459, 422, 450, 422, 450, 432, 432, 432, 431, 446, 449, 447,
        449, 456, 459, 455, 459, 474, 473, 474, 474, 455, 483, 456, 483, 447,
        502, 447, 502, 432, 484, 432, 483, 422, 474, 423, 474, 404,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F2-T7",
      id: "7",
      preFillColor: null,
    },
    {
      shape: "poly",
      coords: [
        458, 479, 458, 497, 448, 498, 448, 507, 430, 507, 431, 521, 448, 521,
        449, 531, 458, 531, 458, 549, 472, 549, 472, 531, 482, 531, 482, 522,
        501, 522, 500, 507, 483, 507, 482, 498, 473, 497, 472, 479,
      ],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "Table Area",
      name: "F2-T8",
      id: "8",
      preFillColor: null,
    },
    {
      shape: "rect",
      coords: [263, 681, 4, 556],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "VIP Area",
      name: "VIP1",
      id: "9",
      preFillColor: null,
    },
    {
      shape: "rect",
      coords: [263, 557, 524, 681],
      fillColor: highlightColor,
      strokeColor: "black",
      title: "VIP Area",
      name: "VIP2",
      id: "10",
      preFillColor: null,
    },
  ],
};

const FloorTwoMapping = ({ props }) => {
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
        width={526}
        height={688}
        onClick={handleClick}
      />
    </div>
  );
};

export default FloorTwoMapping;
