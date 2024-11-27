import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { menuSelector, prefetch } from "../../slices/menuSlice";

import { Carousel, Row, Col, Button, Image, Stack } from "react-bootstrap";

import splitArrayIntoGroups from "../../utils/splitArrayIntoGroups";
import formatVND from "../../utils/formatVND";

import "./css/OrderSuggestion.css";
import StarRating from "../StarRating";
import { addItemToCart, cartSelector } from "../../slices/cartSlice";

const OrderSuggestion = () => {
  const dispatch = useDispatch();

  const cart = useSelector(cartSelector)
  const { orderId } = cart.payment;

  const menu = useSelector(menuSelector);
  const { items } = menu.menuFood;

  const array = [...items];
  // Shuffle items for random choices
  const shuffled = array.sort(() => 0.5 - Math.random());
  // Get sub-array of first 9 elements after shuffled
  let selectedItems = shuffled.slice(0, 9);
  // And split it into groups of 3
  selectedItems = splitArrayIntoGroups(selectedItems, 3);

  useEffect(() => {
    dispatch(prefetch());
  }, []);

  return (
    <div>
      <Carousel interval={null}>
        {selectedItems.slice(0, 3).map((groups, index) => (
          <Carousel.Item key={index}>
            <Row>
              {groups.map((item) => (
                <Col md={4} sm={12} key={item._id}>
                  <Stack direction="vertical" gap={1}>
                    <div className="d-flex align-items-center">
                      <div className="order-suggestion--image">
                        <Image
                          src={item.image}
                          alt={item.image}
                          className=" img-fluid rounded-3"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6>{item.name}</h6>
                        <div className="d-flex flex-wrap justify-content-between">
                          <StarRating item={item} size={"2xs"} />
                          <h6>{formatVND(item.price)}</h6>
                        </div>
                      </div>
                    </div>
                    <Stack gap={2} direction="horizontal">
                      {item.tag
                        .slice(0, item.tag.length > 3 ? 3 : item.tag.length)
                        .map((tag) => {
                          return (
                            <Button
                              variant={""}
                              className="p-1 py-0 menu-item--card--tag "
                              key={tag._id}
                            >
                              <span>{tag.name}</span>
                            </Button>
                          );
                        })}
                    </Stack>
                    <Button
                      variant="danger"
                      className="order-suggestion--add-to-cart align-self-end p-0"
                      onClick={() => dispatch(addItemToCart(item))}
                      disabled={orderId}
                    >
                      <span className="fw-bold">ADD TO CART</span>
                    </Button>
                  </Stack>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default OrderSuggestion;
