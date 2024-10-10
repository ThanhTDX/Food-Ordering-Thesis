import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import MenuItemList from "./MenuItemList";
import MenuItemCard from "./MenuItemCard";
import Pageing from "./Pageing";

import { Row, Col, Stack, Container } from "react-bootstrap";

import { addMenuItem } from "../../slices/customMenuSlice";

function MenuList({
  filteredMenu,
  menuView,
  menuSearchKeyWord,
  menuSearchTags,
  handleUpdateTags,
  menuSearchType,
  handleUpdateType,
  setToasts,
}) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(6);
  const indexOfLastItem =
    currentPage * itemPerPage > filteredMenu.length
      ? filteredMenu.length
      : currentPage * itemPerPage;

  const indexOfFirstItem = (currentPage - 1) * itemPerPage;
  const currentMenu = filteredMenu.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddItemToCart = (item) => {
    console.log(item);
    // TODO : create cartSlice a  nd add this
  };

  const handleAddItemToMenu = (item) => {
    dispatch(addMenuItem(item));
    const ADD = "ADD";
    const newToast = {
      id: nanoid(),
      data: item,
      type: ADD,
      show: true,
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);
    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.map((toast) =>
          toast.id === item.id ? { ...toast, show: false } : toast
        )
      );
    }, 3000); // Adjust the duration as needed
  };

  const handleAddTag = (tag) => {
    handleUpdateTags(tag);
  };
  const handleAddType = (type) => {
    handleUpdateType(type);
  };

  if (filteredMenu.length === 0)
    return <h2> Sorry we don't have what you're looking for. </h2>;
  else if (menuView === "list")
    return (
      <Container className="mt-3">
        <Row>
          <Stack gap={2} direction="vertical">
            {currentMenu.map((item) => {
              return (
                <Col sm={12} md={12} lg={12} xl={12} key={item._id}>
                  <MenuItemList
                    key={item._id}
                    item={item}
                    handleAddItemToCart={handleAddItemToCart}
                    handleAddItemToMenu={handleAddItemToMenu}
                    menuSearchTags={menuSearchTags}
                    handleAddTag={handleAddTag}
                    menuSearchType={menuSearchType}
                    handleAddType={handleAddType}
                    exact
                  />
                </Col>
              );
            })}
          </Stack>
        </Row>

        <Pageing
          filteredMenu={filteredMenu}
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
                <MenuItemCard
                  key={item._id}
                  item={item}
                  handleAddItemToCart={handleAddItemToCart}
                  handleAddItemToMenu={handleAddItemToMenu}
                  menuSearchTags={menuSearchTags}
                  handleAddTag={handleAddTag}
                  menuSearchType={menuSearchType}
                  handleAddType={handleAddType}
                  exact
                />
              </Col>
            );
          })}
        </Row>
        <Pageing
          filteredMenu={filteredMenu}
          itemPerPage={itemPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </>
    );
}

export default MenuList;
