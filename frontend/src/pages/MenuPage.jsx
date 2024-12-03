import React, { useState, useEffect, useCallback } from "react";

import Loader from "../components/Loader";
import Message from "../components/Message";
import MenuList from "../components/menu/MenuList";
import CustomMenu from "../components/customMenu/CustomMenu";
import MenuUtility from "../components/menu/MenuUtility";
import Toasts from "../components/Toasts";

import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Stack, Container, Button } from "react-bootstrap";

import { menuSelector, prefetch } from "../slices/menuSlice";
import { userSelector } from "../slices/userSlice";
import "./static/css/MenuPage.css";
import { nanoid } from "@reduxjs/toolkit";

const MenuPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  // Redux data fetching
  const menu = useSelector(menuSelector);
  const { error, loading, menuFood, menuSearch } = menu;
  const { combo, keyword, tags, type, priceRange } = menuSearch;

  useEffect(() => {
    dispatch(prefetch());
  }, [dispatch]);

  const [filteredMenu, setFilteredMenu] = useState([]);

  // User-centered funcionalities

  const user = useSelector(userSelector)
  const { login } = user

  useEffect(() => {
    if (!menuFood || !menuFood.combos || !menuFood.items) {
      console.log("menuFood or its properties are not available:", menuFood);
      return;
    }

    // Filter Order:
    // 1.   Combo / Item
    // 1.5  If Combo -> Combo keyword
    // 2.   Keyword
    // 3.   Tags
    // 4.   Type
    // 5.   Price

    let menu1 = combo ? menuFood.combos : menuFood.items;

    if (combo) {
      // menuSearch.combo: 'combo'
      console.log("menuSearch.combo", combo);
      menu1 = menu1.filter((item) =>
        item.name.toLowerCase().includes(combo.toLowerCase())
      );
    }

    if (keyword) {
      // menuSearch.keyword: 'keyword'
      console.log("menuSearch.keyword", keyword);
      menu1 = menu1.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );
      console.log(menu1);
    }

    if (tags.length) {
      console.log("menuSearch.tags", tags);
      // menuSearch.tags: ['tags1', 'tags2']
      // Only take items with ALL tags in it
      menu1 = menu1.filter((item) => {
        // iterate through all tag and item.tag
        // if 1 instace of tag is not found in item.tag
        // return false
        let itemHasAllTag = true;
        for (const tag of tags) {
          let tagIsFound = false;
          for (const item_tag of item.tag) {
            if (tag === item_tag.name) tagIsFound = true;
          }
          if (!tagIsFound) itemHasAllTag = false;
        }
        return itemHasAllTag;
      });
      console.log(menu1);
    }

    if (type) {
      // menuSearch.type: 'type'
      menu1 = menu1.filter((item) => item.type.name === type);
      console.log(menu1);
    }

    if (priceRange.upper - priceRange.lower > 1) {
      // menuSearch.type: 'type'
      menu1 = menu1.filter(
        (item) =>
          Number(item.price) >= priceRange.lower &&
          Number(item.price) <= priceRange.upper
      );
      console.log(menu1);
    }
    setFilteredMenu(menu1);
  }, [menuFood, combo, keyword, tags, type, priceRange]);

  const handleSave = () => {
    console.log("Custom Menu Saved");
  };


  // TODO: Find a way to dynamically implement Toasts mechanism
  // const handleNewToasts = (data) => {
  //   // Create new toasts with show value
  //   const newToast = {
  //     id: nanoid(),
  //     data: data,
  //     show: true,
  //   };
  //   setToasts((prevToasts) => [...prevToasts, newToast]);

  //   // Set timeout for 3000ms
  //   setTimeout(() => {
  //     setToasts((prevToasts) =>
  //       prevToasts.map((toast) =>
  //         toast.id === newToast.id ? { ...toast, show: false } : toast
  //       )
  //     );
  //   }, 3000);
  // };

  if (error && loading === false)
    return <Message variant="danger">{error}</Message>;
  else
    return (
      <div className="poppins">
        <Container fluid className="p-0">
          {loading ? (
            <Loader />
          ) : (
            <Row>
              <Col md={0} lg={4} className="mb-3">
                <Container fluid className="p-0">
                  <Stack direction="vertical" gap={2}>
                    <CustomMenu />
                    {login && (
                      <Button
                        variant="success"
                        onClick={() => handleSave()}
                        className="w-100"
                      >
                        <span className="fw-bold">SAVE MENU</span>
                      </Button>
                    )}
                    <Stack direction="horizontal" gap={2}>
                      <Button
                        variant="success"
                        onClick={() => navigate("/order?checkout=true")}
                        className="w-100"
                      >
                        <span className="fw-bold">CHECKOUT</span>
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => navigate("/reservation?customMenu=on")}
                        className="w-100"
                      >
                        <span className="fw-bold">MAKE RESERVATION</span>
                      </Button>
                    </Stack>
                  </Stack>
                </Container>
              </Col>
              <Col md={12} lg={8} className="">
                <MenuUtility />
                <MenuList filteredMenu={filteredMenu} />
              </Col>
            </Row>
          )}
        </Container>
      </div>
    );
}

export default MenuPage;
