import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel, Image } from "react-bootstrap";
import FloorOneMapping from "./reservationTableVip/FloorOneMapping";
import FloorTwoMapping from "./reservationTableVip/FloorTwoMapping";
import FloorThreeMapping from "./reservationTableVip/FloorThreeMapping";

const fetchOccupiedTables = async () => {
  const data = await axios.get(`/api/reservation/tables/occupied/`);
  return data.data;
};
const fetchOccupiedVIPs = async () => {
  const data = await axios.get(`/api/reservation/vips/occupied/`);
  return data.data;
};

const ReservationTableVip = ({ tables, setTables, vips, setVIPs }) => {
  const [occupiedTables, setOccupiedTables] = useState([]);
  const [occupiedVIPs, setOccupiedVIPs] = useState([]);

  const props = {
    tables,
    setTables,
    vips,
    setVIPs,
    occupiedTables,
    occupiedVIPs,
  };

  // useEffect(() => {
  //   setOccupiedTables(fetchOccupiedTables);
  //   setOccupiedVIPs(fetchOccupiedVIPs);
  // }, []);

  return (
    <Carousel slide={false} interval={null}>
      <Carousel.Item>
        <FloorOneMapping props={props} />
      </Carousel.Item>
      <Carousel.Item>
        <FloorTwoMapping props={props} />
      </Carousel.Item>
      <Carousel.Item>
        <FloorThreeMapping props={props} />
      </Carousel.Item>
    </Carousel>
  );
};

export default ReservationTableVip;
