import React, { useState } from "react";
import { Container, Button, Stack, Card, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  customMenuSelector,
  updateMenuItem,
  removeMenuItem,
} from "../../slices/customMenuSlice";

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

import "./CustomMenu.css";
import formatVND from "../../utils/formatVND";

const CustomMenuEdit = ({
  menuItems,
  handleDecrement,
  handleIncrement,
  handleDelete,
}) => {
  return (
    <Container className="custom-menu--body p-0">
      <Stack gap={3} direction="vertical">
        {menuItems.map((item) => {
          return (
            <Row
              className="custom-menu--item__wrapper border rounded-3"
              key={item._id}
            >
              <Col xs={2} className="p-0">
                <img src={item.image} alt={item.image} />
              </Col>
              <Col
                xs={6}
                className="d-flex flex-column align-items-start justify-content-center p-0 ps-2"
              >
                <div className="custom-menu--title fs-6">{item.name}</div>
                <div className="ps-4 w-100 d-flex align-items-center justify-content-start custom-menu--list--item-info__small">
                  <div>
                    <span className="">Price {formatVND(item.price)}</span>
                  </div>
                </div>
              </Col>
              <Col
                xs={4}
                className="p-0 d-flex flex-column align-items-center justify-content-center"
              >
                <div className="custom-menu--edit d-flex align-items-center justify-content-around">
                  <div className="me-1 custom-menu--edit--quantity">
                    <span>Quantity: {item.qty}</span>
                  </div>
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
                <div>{formatVND(item.price*item.qty)}</div>
              </Col>
            </Row>
          );
        })}
      </Stack>
    </Container>
  );
};

const CustomMenuView = ({ menuItems }) => {
  return (
    <Container className="custom-menu--body p-0">
      <Stack gap={3} direction="vertical">
        {menuItems.map((item) => {
          return (
            <Row
              className="custom-menu--item__wrapper border rounded-3"
              key={item._id}
            >
              <Col md={2} className="p-0">
                <img src={item.image} alt={item.image} />
              </Col>

              <Col
                md={6}
                className="d-flex flex-column align-items-start justify-content-center p-0 ps-2"
              >
                <div className="custom-menu--title fs-6">{item.name}</div>
                <div className="ps-2 w-100 d-flex align-items-center justify-content-around custom-menu--list--item-info__small">
                  <div>
                    <span className="">Price {formatVND(item.price)}</span>
                  </div>
                  <div>
                    <span>Quantity: {item.qty}</span>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="custom-menu--list--item-price text-end">
                  {formatVND(item.price * item.qty)}
                </div>
              </Col>
            </Row>
          );
        })}
      </Stack>
    </Container>
  );
};

const CustomMenu = ({ }) => {
  const dispatch = useDispatch();
  const [editableCustom, enableEdit] = useState(true);
  const customMenu = useSelector(customMenuSelector);
  const { menu, price } = customMenu;
  const { menuItems, menuCombo } = menu;

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
    enableEdit((prev) => !prev);
  };

  const handleDelete = (item) => {
    dispatch(removeMenuItem(item));
    const DELETE = "DELETE";

    // TODO: create toasts system
    // const message = {
    //   data: item,
    //   type: DELETE,
    // };
    // handleNewToasts(message);
  };

  return (
    <>
      <Card className="custom-menu__wrapper p-0">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h2 className="m-0">Your Personal Menu</h2>
          <div className="custom-menu--edit-button rounded-2">
            <Button
              variant=""
              className=""
              onClick={() => enableEdit(!editableCustom)}
            >
              <span className="me-1">Edit</span>{" "}
              <FontAwesomeIcon icon={faCog} size="lg" />
            </Button>
          </div>
        </div>
        {!editableCustom && (
          <CustomMenuEdit
            menuItems={menuItems}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            handleDelete={handleDelete}
            price={price}
          />
        )}
        {editableCustom && <CustomMenuView menuItems={menuItems} />}
        <div className="align-self-end">
          <h5 className="d-inline fs-3 fw-bold">Total Price </h5>
          <span className="fs-3 fw-bold">{formatVND(price)}</span>
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
      </Card>
    </>
  );
};

export default CustomMenu;
