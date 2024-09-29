import React, { useState, useEffect } from "react";

import Loader from "../components/Loader";
import Message from "../components/Message";

import MenuItem from "../components/MenuItem";

import CustomMenu from "../components/CustomMenu";
import MenuUtility from "../components/MenuUtility";

import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Stack, Container } from "react-bootstrap";

import { menuSelector, fetchAllFood } from "../slices/menuSlice";

function Menu() {
  const dispatch = useDispatch();
  const menu = useSelector(menuSelector);
  const {
    error,
    loading,
    menuItems,
  } = menu;

  useEffect(() => {
    dispatch(fetchAllFood());
  }, []);

  return (
    <Container fluid>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={0} lg={4} className="">
            <Container fluid>
              <Stack direction="vertical" gap={5}>
                <MenuUtility />
                <CustomMenu />
              </Stack>
            </Container>
          </Col>
          <Col md={12} lg={8} className="">
            <Row>
              {menuItems.map((item) => (
                <Col key={item._id} sm={12} md={6} lg={4}>
                  <MenuItem item={item} exact />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Menu;
