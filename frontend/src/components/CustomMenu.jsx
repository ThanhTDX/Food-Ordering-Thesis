import React from "react";
import { Container, Button, Stack , Card} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  customMenuSelector,
  updateMenuItem,
  removeMenuItem,
} from "../slices/customMenuSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faTrashCan,
  faCheck,
  faComment,
  faTriangleExclamation,
  faExclamation,
  faCommentDots,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

import { nanoid } from "@reduxjs/toolkit";

import "./CustomMenu.css"
import formatVND from "../utils/formatVND";

const CustomMenu = ({ setToasts }) => {
  const dispatch = useDispatch();
  const customMenu = useSelector(customMenuSelector);
  const { menu, price } = customMenu;
  const { menuItems, menuCombo} = menu

  const handleIncrement = (item) => {
    dispatch(updateMenuItem({ menuItem: item, qty: item.qty + 1 }));
  };

  const handleDecrement = (item) => {
    dispatch(updateMenuItem({ menuItem: item, qty: item.qty - 1 }));
  };

  const handleUpdate = (item, qty) => {
    dispatch(updateMenuItem({ menuItem: item, qty: qty }));
  };

  const handleEdit = () => {

  }

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
    <Card className="custom-menu__wrapper p-0">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h2 className="m-0">Your Personal Menu</h2>
        <div className="custom-menu--edit-button rounded-2">
          <Button variant="" className="" onClick={() => handleEdit()}>
            <span className="me-1">Edit</span> <FontAwesomeIcon icon={faCog} size="lg" />
          </Button>
        </div>
      </div>

      <Container className="custom-menu--body p-0">
        <Stack gap={3}>
          {menuItems.map((item) => {
            return (
              <div
                className="custom-menu--item__wrapper border rounded-3"
                key={item._id}
              >
                <img src={item.image} alt={item.image} />
                <div className="custom-menu--title">{item.name}</div>
                <div className="custom-menu--buttons d-flex align-items-center justify-content-around">
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
          <div className="align-self-end">
            <h5 className="d-inline">Price</h5> <vr> </vr>
            <span>{formatVND(price)}</span>
          </div>
          <div className="custom-menu--report__wrapper">
            <Container className="custom-menu--report__success border-dark p-3 ps-4">
              <div className="">
                <FontAwesomeIcon
                  icon={faCheck}
                  size="xl"
                  style={{ color: "#2ff906" }}
                />
                <span className="ms-3"> Looks Good To Me!</span>
              </div>
            </Container>

            <Container className="custom-menu--report__initial border-dark p-3 ps-4">
              <div className="">
                <FontAwesomeIcon icon={faComment} size="xl" />
                <span className="ms-3">Let's Start With This!</span>
              </div>
              <div></div>
            </Container>

            <Container className="custom-menu--report__warning border-dark p-3 ps-4">
              <div className="">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  size="xl"
                  style={{ color: "#FFD43B" }}
                />
                <span className="ms-3">Hey You're Having Too Many Of ...</span>
              </div>
            </Container>

            <Container className="custom-menu--report__warning border-dark p-3 ps-4">
              <div className="">
                <FontAwesomeIcon
                  icon={faExclamation}
                  size="xl"
                  style={{ color: "#d42525" }}
                />
                <span className="ms-3">Combo Detected! Get This Too!</span>
              </div>
            </Container>

            <Container className="custom-menu--report__warning border-dark p-3 ps-4">
              <div className="">
                <FontAwesomeIcon icon={faCommentDots} size="xl" />
                <span className="ms-3">You Should Get More Of ...</span>
              </div>
            </Container>
          </div>
        </Stack>
      </Container>
    </Card>
  );
};

export default CustomMenu;
