import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { menuSelector, prefetch } from "../../slices/menuSlice";

import { Carousel, Row, Col, Button, Image, Stack } from "react-bootstrap";

import splitArrayIntoGroups from "../../utils/splitArrayIntoGroups";
import formatVND from "../../utils/formatVND";

import "./css/OrderSuggestion.css";
import StarRating from "../StarRating";
import { addItemToCart, cartSelector } from "../../slices/cartSlice";



const OrderSuggestion = () => {
  const dispatch = useDispatch();

  const cart = useSelector(cartSelector);
  const { orderId } = cart.payment;

  const menu = useSelector(menuSelector, shallowEqual);
  const { items } = menu.menuFood;
  useEffect(() => {
    dispatch(prefetch());
  }, [dispatch]);

  const selectedItems = useMemo(() => {
    // Shuffle items for random choices
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    // And split it into groups of 3
    return splitArrayIntoGroups(shuffled.slice(0, 9), 3);
  }, [items]);

  return (
    <div className="cart__suggestion__carousel">
      <Carousel interval={null} className="px-4">
        {selectedItems.slice(0, 3).map((groups, index) => (
          <Carousel.Item key={index}>
            <Row>
              {groups.map((item) => (
                <Col md={4} sm={12} key={item._id} className="mb-sm-2">
                  <Stack direction="vertical" gap={1}>
                    <div className="d-flex align-items-center">
                      <div className="order-suggestion--image">
                        <Image
                          src={item.image}
                          alt={item.image}
                          className=" img-fluid rounded-3"
                        />
                      </div>
                      <div className="flex-grow-1 ms-1">
                        <h6>{item.name}</h6>
                        <div className="d-flex justify-content-between align-items-center">
                          <StarRating item={item} size={"2xs"} />
                          <span className="fs-6">{formatVND(item.price)}</span>
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
                              className="p-1 py-0 order-suggestion--tag "
                              key={tag._id}
                            >
                              <span>{tag.name}</span>
                            </Button>
                          );
                        })}
                    </Stack>
                    <Stack
                      gap={2}
                      direction="horizontal"
                      className="d-flex justify-content-between align-items-center"
                    >
                      <Button
                        variant=""
                        className="order-suggestion--type px-1 py-0"
                      >
                        <span className="">{item.type.name}</span>
                      </Button>
                      <Button
                        variant="danger"
                        className="order-suggestion--add-to-cart justify-self-end p-0"
                        onClick={() => dispatch(addItemToCart(item))}
                        disabled={orderId}
                      >
                        <span className="fw-bold">ADD TO CART</span>
                      </Button>
                    </Stack>
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
