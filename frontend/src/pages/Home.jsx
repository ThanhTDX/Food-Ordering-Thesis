import React, { useState, useEffect } from "react";
import Menu from "../pages/Menu";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { menuList } from "../action/menuActions";

function Home() {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menuList);
  const { error, loading, products } = menu;

  useEffect(() => {
    dispatch(menuList());
  }, []);

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Menu product={product} exact />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Home;
