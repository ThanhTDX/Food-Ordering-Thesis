import React, { useState, useEffect } from "react";

import Loader from "../components/Loader";
import Message from "../components/Message";


import MenuList from '../components/MenuList'
import CustomMenu from "../components/CustomMenu";
import MenuUtility from "../components/MenuUtility";

import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Stack, Container } from "react-bootstrap";

import { menuSelector, fetchAllFood } from "../slices/menuSlice";

function Menu() {
  const dispatch = useDispatch();
  const menu = useSelector(menuSelector);
  const { error, loading, menuItems } = menu;

  const [menuView, setMenuView] = useState("card");
  const [menuSearchKeyWord, setKeyWord] = useState("");
  const [menuSearchTags, setTags] = useState([]);
  const [menuSearchType, setType] = useState("");

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
                <CustomMenu />
              </Stack>
            </Container>
          </Col>
          <Col md={12} lg={8} className="">
            <MenuUtility
              setMenuView={setMenuView}
              setKeyWord={setKeyWord}
              setTags={setTags}
              setType={setType}
            />
            <MenuList
              menuItems={menuItems}
              menuView={menuView}
              menuSearchKeyWord={menuSearchKeyWord}
              menuSearchTags={menuSearchTags}
              menuSearchType={menuSearchType}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Menu;
