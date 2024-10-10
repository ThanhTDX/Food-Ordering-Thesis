import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as faStarSolid,
  faStarHalfStroke,
  faBookOpen,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

import { Card, Stack, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./css/MenuItemList.css";

function MenuItemList({
  item,
  handleAddItemToCart,
  handleAddItemToMenu,
  menuSearchTags,
  handleAddTag,
  menuSearchType,
  handleAddType,
}) {
  return (
    <Card className="shadow-0 border rounded-3 menu-item--list">
      <Card.Body className="py-0">
        <Row>
          <Col
            xs={3}
            sm={3}
            md={3}
            lg={3}
            xl={3}
            className="p-0 align-items-center justify-content-center d-flex"
          >
            <Link to={`/menu/${item._id}`}>
              <div className="position-relative menu-item--list--image">
                <Card.Img
                  src={item.image}
                  className="d-flex align-self-center"
                />
                <div class="menu-item--list--image__mask position-absolute top-0 start-0 d-flex justify-content-center align-items-center w-100 h-100 text-white fs-5"></div>
              </div>
            </Link>
          </Col>
          <Col xs={5} sm={5} md={5} lg={5} xl={6} className="py-1">
            <Link
              to={`/menu/${item._id}`}
              className="menu-item--list--title text-decoration-none position-relative"
            >
              <h4>{item.name}</h4>

              {item.is_hot && (
                <span className="menu-item--list--hot position-absolute top-0 end-0">
                  !HOT
                </span>
              )}
            </Link>

            <div className="d-flex flex-row">
              <div className="text-warning mb-1 me-2">
                <span>
                  {item.rating >= 1 && <FontAwesomeIcon icon={faStarSolid} />}
                  {item.rating >= 0 &&
                    item.rating < 1 &&
                    item.num_of_rating !== 0 && (
                      <FontAwesomeIcon icon={faStarHalfStroke} />
                    )}
                  {item.num_of_rating === 0 && (
                    <FontAwesomeIcon icon={faStarRegular} />
                  )}
                </span>
                <span>
                  {item.rating >= 2 && <FontAwesomeIcon icon={faStarSolid} />}
                  {item.rating >= 1.5 && item.rating < 2 && (
                    <FontAwesomeIcon icon={faStarHalfStroke} />
                  )}
                  {item.rating < 1.5 && (
                    <FontAwesomeIcon icon={faStarRegular} />
                  )}
                </span>
                <span>
                  {item.rating >= 3 && <FontAwesomeIcon icon={faStarSolid} />}
                  {item.rating >= 2.5 && item.rating < 3 && (
                    <FontAwesomeIcon icon={faStarHalfStroke} />
                  )}
                  {item.rating < 2.5 && (
                    <FontAwesomeIcon icon={faStarRegular} />
                  )}
                </span>
                <span>
                  {item.rating >= 4 && <FontAwesomeIcon icon={faStarSolid} />}
                  {item.rating >= 3 && item.rating < 3.5 && (
                    <FontAwesomeIcon icon={faStarHalfStroke} />
                  )}
                  {item.rating < 3 && <FontAwesomeIcon icon={faStarRegular} />}
                </span>
                <span>
                  {item.rating >= 5 && <FontAwesomeIcon icon={faStarSolid} />}
                  {item.rating >= 4 && item.rating < 4.5 && (
                    <FontAwesomeIcon icon={faStarHalfStroke} />
                  )}
                  {item.rating < 4 && <FontAwesomeIcon icon={faStarRegular} />}
                </span>
                <span className="menu-item--list-rating ms-2">
                  {item.num_of_rating}
                </span>
              </div>
            </div>
            <div className="">
              <Stack gap={1} direction="horizontal">
                {item.food_tag
                  .slice(0, item.food_tag.length > 6 ? 6 : item.food_tag.length)
                  .map((tag) => {
                    return (
                      <Button
                        variant={""}
                        className={
                          "menu-item--list--tag p-1 py-0 " +
                          (menuSearchTags.includes(tag) ? "active" : "inactive")
                        }
                        onClick={() => handleAddTag(tag)}
                      >
                        <span>{tag}</span>
                      </Button>
                    );
                  })}
              </Stack>
            </div>
            <div className="mt-1">
              <h5 className="d-inline align-items-center w-25">Type</h5>
              <Button
                variant={
                  ""
                }
                className={"menu-item--list--type ms-3 w-75 " + (menuSearchType === item.food_type ? "active" : "inactive")}
                onClick={() => handleAddType(item.food_type)}
              >
                <span className="">{item.food_type}</span>
              </Button>
            </div>
          </Col>
          <Col
            xs={4}
            sm={4}
            md={4}
            lg={4}
            xl={3}
            className="border-sm-start-none border-start"
          >
            <Stack gap={2}>
              <div className="d-flex flex-column mb-1">
                <h4 className="mb-1 me-1">VND{item.price}</h4>
                <span class="text-danger align-self-end">
                  <s>VND{item.price}</s>
                </span>
                <h6 class="text-success">Free shipping</h6>
              </div>
              <Stack gap={2} direction="horizontal" className="mb-1">
                <Button
                  variant=""
                  className="w-100 menu-item--add-to-cart"
                  onClick={() => handleAddItemToCart(item)}
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                </Button>
                <Button
                  variant=""
                  className="w-100 menu-item--add-to-menu"
                  onClick={() => handleAddItemToMenu(item)}
                >
                  <FontAwesomeIcon icon={faBookOpen} />
                </Button>
              </Stack>
            </Stack>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default MenuItemList;
