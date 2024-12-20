// REACT + REDUX 
import React from "react";
import { useDispatch, useSelector } from "react-redux";

// CSS + BOOTSTRAP + REACT_BOOTSTRAP 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Card, Stack, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/MenuItemList.css";

// UTILS
import formatVND from "../../utils/formatVND";
import StarRating from "../StarRating";

// REDUX SLICES
import {
  menuSelector,
  updateSearchTags,
  updateSearchType,
} from "../../slices/menuSlice";
import { addItemToCart } from "../../slices/cartSlice";
import { addMenuItem } from "../../slices/customMenuSlice";

function MenuItemList({ item }) {
  const menu = useSelector(menuSelector);
  const dispatch = useDispatch();
  const { menuSearch } = menu;
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
            <Link to={`/menu/item/${item._id}`}>
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
              to={`/menu/item/${item._id}`}
              className="menu-item--list--title text-decoration-none position-relative"
            >
              <h4>{item.name}</h4>

              {item.is_hot && (
                <span className="menu-item--list--hot position-absolute top-0 end-0">
                  !HOT
                </span>
              )}
            </Link>

            <StarRating item={item} size={"md"} />
            <div className="">
              <Stack gap={1} direction="horizontal">
                {item.tag
                  .slice(0, item.tag.length > 6 ? 6 : item.tag.length)
                  .map((tag) => {
                    return (
                      <Button
                        variant={""}
                        className={
                          "menu-item--list--tag p-1 py-0 " +
                          (menuSearch.tags.includes(tag.name)
                            ? "active"
                            : "inactive")
                        }
                        onClick={() => dispatch(updateSearchTags(tag.name))}
                        key={tag._id}
                      >
                        <span>{tag.name}</span>
                      </Button>
                    );
                  })}
              </Stack>
            </div>
            <div className="mt-1 d-flex align-items-center justify-content-start">
              <h5 className="m-0">Type</h5>
              <Button
                variant={""}
                className={
                  "menu-item--list--type ms-3 w-100 " +
                  (menuSearch.type === item.type.name ? "active" : "inactive")
                }
                onClick={() => dispatch(updateSearchType(item.type.name))}
              >
                <span className="">{item.type.name}</span>
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
                <h4 className="mb-1 me-1">{formatVND(item.price)}</h4>
                <span class="text-danger align-self-end">
                  <s>{formatVND(item.price)}</s>
                </span>
              </div>
              <Stack gap={2} direction="horizontal" className="mb-1">
                <Button
                  variant=""
                  className="w-100 menu-item--add-to-menu"
                  onClick={() => dispatch(addMenuItem(item))}
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
