import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MenuItemList from "./MenuItemList";
import MenuItemCard from "./MenuItemCard";
import Pageing from "./Pageing";

import { Row, Col, Stack, Container } from "react-bootstrap";

import { menuSelector } from "../../slices/menuSlice";
import { addMenuItem } from "../../slices/customMenuSlice";

function MenuList({ filteredMenu }) {

  const dispatch = useDispatch();
  const menu = useSelector(menuSelector);
  const { menuView } = menu;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerpage] = useState(6);
  const indexOfLastItem =
    currentPage * itemPerPage > filteredMenu.length
      ? filteredMenu.length
      : currentPage * itemPerPage;
  const indexOfFirstItem = (currentPage - 1) * itemPerPage;
  const currentMenu = filteredMenu.slice(indexOfFirstItem, indexOfLastItem);

  if (filteredMenu.length === 0)
    return <h2> Sorry we don't have what you're looking for. </h2>;
  else if (menuView === "list")
    return (
      <Container className="mt-3 p-0">
        <Row>
          <Stack gap={2} direction="vertical">
            {currentMenu.map((item) => {
              return (
                <Col sm={12} md={12} lg={12} xl={12} key={item._id}>
                  <MenuItemList item={item} exact />
                </Col>
              );
            })}
          </Stack>
        </Row>
        <Pageing
          items={filteredMenu}
          itemPerPage={itemPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Container>
    );
  // menuView === "card"
  else
    return (
      <>
        <Row>
          {currentMenu.map((item) => {
            return (
              <Col sm={12} md={6} lg={4} key={item._id}>
                <MenuItemCard key={item._id} item={item} exact />
              </Col>
            );
          })}
        </Row>
        <Pageing
          items={filteredMenu}
          itemPerPage={itemPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </>
    );
}

export default MenuList;
