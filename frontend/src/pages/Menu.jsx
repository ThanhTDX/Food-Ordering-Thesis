import React, { useState, useEffect } from "react";

import Loader from "../components/Loader";
import Message from "../components/Message";

import MenuList from "../components/menu/MenuList";
import CustomMenu from "../components/CustomMenu";
import MenuUtility from "../components/menu/MenuUtility";

import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Stack, Container } from "react-bootstrap";

import { menuSelector, fetchAllFood } from "../slices/menuSlice";

import "./Menu.css";
import MenuToasts from "../components/menu/MenuToasts";

function Menu() {
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
  }, [dispatch]);

  useEffect(() => {
    let { menuItems } = menu;
    if (menuSearchKeyWord) {
      console.log("menuSearchKeyWord", menuSearchKeyWord);
      menuItems = menuItems.filter((item) =>
        item.name.toLowerCase().includes(menuSearchKeyWord.toLowerCase())
      );
    }

    if (menuSearchTags.length) {
      console.log("menuSearchTags", menuSearchTags);
      menuItems = menuItems.filter((item) => {
        for (const tag of menuSearchTags) {
          if (!item.food_tag.includes(tag)) return false;
        }
        return true;
      });
    }

    if (menuSearchType) {
      menuItems = menuItems.filter((item) => item.food_type === menuSearchType);
    }
    console.log("after", menuItems);
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

  return (
    <div className="roboto-slab">
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
                  <CustomMenu setToasts={setToasts} />
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
                setToasts={setToasts}
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