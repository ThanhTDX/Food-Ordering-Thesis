import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as faStarSolid,
  faStarHalfStroke,
  faBookOpen,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

import { Card, Stack, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./css/MenuItemCard.css";

function MenuItemCard({
  item,
  handleAddItemToCart,
  handleAddItemToMenu,
  menuSearchTags,
  handleAddTag,
  menuSearchType,
  handleAddType,
}) {

  const formatVND = (num) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      currencyDisplay: "symbol",
    }).format(num);
  }

  return (
    <Card className="menu-item--card mb-4">
      <Card.Header>
        <Container className="position-relative p-0">
          <div className="z-1 position-absolute w-100 p-1">
            <div className="d-flex justify-content-between align-items-center">
              {/* TODO: promotion conditioning */}
              <span className="menu-item--card--promotion">-25%</span>
              {/* TODO: isHot conditioning */}
              {item.is_hot && (
                <span className="menu-item--card--hot">!HOT</span>
              )}
            </div>
          </div>
          <Link to={`/menu/${item._id}`} className="z-0">
            <div className="position-relative menu-item--card--image">
              <Card.Img
                src={item.image}
                alt={item.name}
                className="d-flex align-self-center"
              />
              <div class="menu-item--card--image__mask position-absolute top-0 start-0 d-flex justify-content-center align-items-center w-100 h-100 text-white fs-5"></div>
            </div>
          </Link>
        </Container>
        <Container className="product-detail-container p-0">
          <div className="d-flex justify-content-between align-items-center">
            <Link to={`/menu/${item._id}`} className="text-decoration-none">
              <h5 className="menu-item--card--title">{item.name}</h5>
            </Link>
            <div className="d-flex flex-column">
              {/* TODO: CHANGE PRICE COLOR + PROMOTION CONDITIONING */}
              <span className="new-price">{formatVND(item.price)}</span>
              <span className="old-price align-self-end">
                <small className="">
                  <s>{formatVND(item.price)}</s>
                </small>
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <Stack gap={2} direction="vertical">
              <Stack gap={2} direction="horizontal">
                {item.food_tag
                  .slice(0, item.food_tag.length > 3 ? 3 : item.food_tag.length)
                  .map((tag) => {
                    return (
                      <Button
                        variant={""}
                        className={
                          "p-1 py-0 menu-item--card--tag " +
                          (menuSearchTags.includes(tag) ? "active" : "inactive")
                        }
                        onClick={() => handleAddTag(tag)}
                      >
                        <span>{tag}</span>
                      </Button>
                    );
                  })}
              </Stack>
              {item.food_tag.length >= 3 && (
                <Stack gap={2} direction="horizontal">
                  {item.food_tag
                    .slice(
                      3,
                      item.food_tag.length > 6 ? 6 : item.food_tag.length
                    )
                    .map((tag) => {
                      return (
                        <Button
                          variant={
                            menuSearchTags.includes(tag)
                              ? "danger"
                              : "secondary"
                          }
                          className="menu-item--card--tag p-1 py-0 "
                          onClick={() => handleAddTag(tag)}
                        >
                          <span>{tag}</span>
                        </Button>
                      );
                    })}
                </Stack>
              )}
            </Stack>
            <div className="d-flex flex-row">
              <div className="text-warning align-self-end">
                <span>
                  {item.rating >= 1 && (
                    <FontAwesomeIcon icon={faStarSolid} size={"xs"} />
                  )}
                  {item.rating >= 0 &&
                    item.rating < 1 &&
                    item.num_of_rating !== 0 && (
                      <FontAwesomeIcon icon={faStarHalfStroke} size={"xs"} />
                    )}
                  {item.num_of_rating === 0 && (
                    <FontAwesomeIcon icon={faStarRegular} size={"xs"} />
                  )}
                </span>
                <span>
                  {item.rating >= 2 && (
                    <FontAwesomeIcon icon={faStarSolid} size={"xs"} />
                  )}
                  {item.rating >= 1.5 && item.rating < 2 && (
                    <FontAwesomeIcon icon={faStarHalfStroke} size={"xs"} />
                  )}
                  {item.rating < 1.5 && (
                    <FontAwesomeIcon icon={faStarRegular} size={"xs"} />
                  )}
                </span>
                <span>
                  {item.rating >= 3 && (
                    <FontAwesomeIcon icon={faStarSolid} size={"xs"} />
                  )}
                  {item.rating >= 2.5 && item.rating < 3 && (
                    <FontAwesomeIcon icon={faStarHalfStroke} size={"xs"} />
                  )}
                  {item.rating < 2.5 && (
                    <FontAwesomeIcon icon={faStarRegular} size={"xs"} />
                  )}
                </span>
                <span>
                  {item.rating >= 4 && (
                    <FontAwesomeIcon icon={faStarSolid} size={"xs"} />
                  )}
                  {item.rating >= 3 && item.rating < 3.5 && (
                    <FontAwesomeIcon icon={faStarHalfStroke} size={"xs"} />
                  )}
                  {item.rating < 3 && (
                    <FontAwesomeIcon icon={faStarRegular} size={"xs"} />
                  )}
                </span>
                <span>
                  {item.rating >= 5 && (
                    <FontAwesomeIcon icon={faStarSolid} size={"xs"} />
                  )}
                  {item.rating >= 4 && item.rating < 4.5 && (
                    <FontAwesomeIcon icon={faStarHalfStroke} size={"xs"} />
                  )}
                  {item.rating < 4 && (
                    <FontAwesomeIcon icon={faStarRegular} size={"xs"} />
                  )}
                </span>
                <span className="menu-item--card-rating ms-1">
                  {item.num_of_rating}
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-1">
            <Button
              variant={
                ""
              }
              className={"menu-item--card--type w-100 me-3" + (menuSearchType === item.food_type ? "active" : "inactive")}
              onClick={() => handleAddType(item.food_type)}
            >
              <span>{item.food_type}</span>
            </Button>
            <Stack gap={2} direction="horizontal" className="">
              <Button
                variant=""
                className="menu-item--add-to-cart w-100"
                onClick={() => handleAddItemToCart(item)}
              >
                <FontAwesomeIcon icon={faCartShopping} />
              </Button>
              <Button
                variant=""
                className="menu-item--add-to-menu w-100"
                onClick={() => handleAddItemToMenu(item)}
              >
                <FontAwesomeIcon icon={faBookOpen} />
              </Button>
            </Stack>
          </div>
        </Container>
      </Card.Header>
    </Card>
  );
}

export default MenuItemCard;
