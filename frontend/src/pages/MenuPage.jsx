import React, { useState, useEffect } from "react";

import Loader from "../components/Loader";
import Message from "../components/Message";

import MenuList from "../components/menu/MenuList";
import CustomMenu from "../components/customMenu/CustomMenu";
import MenuUtility from "../components/menu/MenuUtility";
import MenuToasts from "../components/Toasts";

import { useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Stack, Container, Button } from "react-bootstrap";

import { menuSelector, fetchAllFood, fetchAllCombo } from "../slices/menuSlice";

import "./MenuPage.css";
import { nanoid } from "@reduxjs/toolkit";

function Menu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menu = useSelector(menuSelector);
  const { error, loading } = menu;

  const [menuView, setMenuView] = useState("card");
  const [menuSearchKeyWord, setKeyWord] = useState(null);
  const [menuSearchTags, setTags] = useState([]);
  const [menuSearchType, setType] = useState(null);
  const [filteredMenu, setFilteredMenu] = useState([]);

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    dispatch(fetchAllFood());
    dispatch(fetchAllCombo());
  }, [dispatch]);

  useEffect(() => {
    let { menuItems, menuCombos } = menu.menu;
    if (menuSearchKeyWord) {
      // menuSearchTags: 'keyword'
      console.log("menuSearchKeyWord", menuSearchKeyWord);
      menuItems = menuItems.filter((item) =>
        item.name.toLowerCase().includes(menuSearchKeyWord.toLowerCase())
      );
    }

    if (menuSearchTags.length) {
      console.log("menuSearchTags", menuSearchTags);
      // menuSearchTags: ['tags1', 'tags2']
      // Only take items with ALL tags in it
      menuItems = menuItems.filter((item) => {
        // iterate through all tag and item.tag
        // if 1 instace of tag is not found in item.tag
        // return false
        let itemHasAllTag = true;
        for (const tag of menuSearchTags) {
          let tagIsFound = false;
          for (const item_tag of item.tag) {
            if (tag === item_tag.name) tagIsFound = true;
          }
          if (!tagIsFound) itemHasAllTag = false;
        }
        return itemHasAllTag;
      });
      console.log(menuItems)
    }

    if (menuSearchType) {
      // menuSearchTags: 'type'
      menuItems = menuItems.filter((item) => item.type.name === menuSearchType);
    }
    setFilteredMenu(menuItems);
  }, [menu, menuSearchKeyWord, menuSearchTags, menuSearchType]);

  const handleMenuView = (view) => {
    setMenuView(view);
  };

  const handleUpdateKeyWord = (keyword) => {
    setKeyWord(keyword);
  };

  const handleUpdateTags = (tag) => {
    if (!menuSearchTags.includes(tag)) setTags([...menuSearchTags, tag]);
    else setTags(menuSearchTags.filter((_tag) => _tag !== tag));
  };

  const handleUpdateType = (type) => {
    if (menuSearchType !== type) setType(type);
    else if (menuSearchType === type) setType(null);
    else setType(null);
  };

  const handleNewToasts = (data) => {
    // Create new toasts with show value 
    const newToast = {
      id: nanoid(),
      data: data,
      show: true,
    }
    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Set timeout for 3000ms
    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.map((toast) =>
          toast.id === newToast.id ? { ...toast, show: false } : toast
        )
      );
    }, 3000);
  };

  const handleSave = () => {

  }

  return (
    <div className="roboto-slab">
      <Container fluid className="p-0">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            <Col md={0} lg={4} className="mb-3">
              <Container fluid className="p-0">
                <Stack direction="vertical" gap={2}>
                  <CustomMenu handleNewToasts={handleNewToasts} />
                  <Stack direction="horizontal" gap={2}>
                    <Button
                      variant="success"
                      onClick={() => navigate("/order")}
                      className="w-100"
                    >
                      <span className="fw-bold">CHECKOUT</span>
                    </Button>
                    <Button
                      variant="success"
                      onClick={handleSave}
                      className="w-100"
                    >
                      <span className="fw-bold">SAVE MENU</span>
                    </Button>
                  </Stack>
                  <Button
                    variant="success"
                    onClick={() => navigate("/reservation?customMenu=on")}
                  >
                    <span className="fw-bold">MAKE RESERVATION</span>
                  </Button>
                </Stack>
              </Container>
            </Col>
            <Col md={12} lg={8} className="">
              <MenuUtility
                handleMenuView={handleMenuView}
                handleUpdateKeyWord={handleUpdateKeyWord}
                menuSearchTags={menuSearchTags}
                handleUpdateTags={handleUpdateTags}
                menuSearchType={menuSearchType}
                handleUpdateType={handleUpdateType}
              />
              <MenuList
                filteredMenu={filteredMenu}
                menuView={menuView}
                menuSearchKeyWord={menuSearchKeyWord}
                menuSearchTags={menuSearchTags}
                handleUpdateTags={handleUpdateTags}
                menuSearchType={menuSearchType}
                handleUpdateType={handleUpdateType}
                handleNewToasts={handleNewToasts}
              />
            </Col>
          </Row>
        )}
      </Container>
      <MenuToasts toasts={toasts} setToasts={setToasts} />
    </div>
  );
}

export default Menu;
