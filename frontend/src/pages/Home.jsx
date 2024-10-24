import React, { useState, useEffect } from "react";
import MenuPage from "../pages/MenuPage";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { menuSelector } from "../slices/menuSlice";

function Home() {
  const dispatch = useDispatch();
  const menu = useSelector(menuSelector);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   dispatch(menuList());
  // }, []);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <MenuPage />
  );
}

export default Home;
