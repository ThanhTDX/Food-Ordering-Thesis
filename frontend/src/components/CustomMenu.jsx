import React from "react";
import { Container, Button, Stack } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  customMenuSelector,
  updateMenuItem,
  removeMenuItem,
} from "../slices/customMenuSlice";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "@reduxjs/toolkit";

const CustomMenu = ({ setToasts }) => {
  const dispatch = useDispatch();
  const customMenu = useSelector(customMenuSelector);
  const navigate = useNavigate();
  const { menuItems, price } = customMenu;

  const handleIncrement = (item) => {
    dispatch(updateMenuItem({ menuItem: item, qty: item.qty + 1 }));
  };

  const handleDecrement = (item) => {
    dispatch(updateMenuItem({ menuItem: item, qty: item.qty - 1 }));
  };

  const handleUpdate = (item, qty) => {
    dispatch(updateMenuItem({ menuItem: item, qty: qty }));
  };

  const handleDelete = (item) => {
    dispatch(removeMenuItem(item));

    const DELETE = "DELETE";
    const newToast = {
      id: nanoid(),
      data: item,
      type: DELETE,
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

  return (
    <Container className="custom-menu--wrapper p-0">
      <h2>Your Personal Menu</h2>
      <Container className="custom-menu p-0">
        <Stack gap={3}>
          {menuItems.map((item) => {
            return (
              <div
                className="custom-menu__item--wrapper border rounded-3"
                key={item._id}
              >
                <img src={item.image} alt={item.image} />
                <div className="custom-menu__title">{item.name}</div>
                <div className="custom-menu__buttons">
                  <div>{item.qty}</div>
                  <Button
                    variant="transparent"
                    onClick={() => handleDecrement(item)}
                  >
                    <FontAwesomeIcon icon={faArrowDown} />
                  </Button>
                  <Button
                    variant="transparent"
                    onClick={() => handleIncrement(item)}
                  >
                    <FontAwesomeIcon icon={faArrowUp} />
                  </Button>
                  <Button
                    variant="transparent"
                    onClick={() => handleDelete(item)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </Button>
                </div>
              </div>
            );
          })}
          <div>
            <h5>Price</h5>
            {price} VND
          </div>
          <div className="custom-menu__report--wrapper">
            <h1>REPORT</h1>
          </div>
          <Button variant="success" onClick={() => navigate("/checkout")}>
            CHECKOUT
          </Button>
        </Stack>
      </Container>
    </Container>
  );
};

export default CustomMenu;
