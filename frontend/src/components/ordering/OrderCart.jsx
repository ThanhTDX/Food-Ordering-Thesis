import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Col, Row, Image, Button, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import "./css/OrderCart.css";
import {
  removeMenuItem,
  updateMenuItem,
} from "../../slices/customMenuSlice";
import {
  cartSelector,
  updateItemInCart,
  removeItemFromCart,
} from "../../slices/cartSlice";

import formatVND from "../../utils/formatVND";

const OrderCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);

  // All methods regarding cart adjustments will be disabled once
  // payment has been finished
  const { orderId } = cart.payment;
  const { items, price, promotions, discountedPrice } = cart.cartContent;
  
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="fw-bold mb-0">Ordering Cart</h1>
        <h6 className="mb-0 text-muted">{items.length} items</h6>
      </div>
      <hr className="my-2"></hr>
      <Stack direction="vertical" gap={3}>
        {items.map((item) => {
          return (
            <Row
              className="d-flex justify-content-between align-items-center order--item-list"
              key={item._id}
            >
              <Col md={2} lg={2} xl={2} className="mb-md-0 mb-xs-2">
                <Image src={item.image} className="img-fluid rounded-3" />
              </Col>
              <Col md={5} lg={5} xl={5} className="d-flex flex-column">
                <div>
                  <h4>{item.name}</h4>
                </div>
              </Col>
              <Col md={4} lg={4} xl={4} className="d-flex flex-column">
                <div className="d-flex order--item-list--update">
                  <Button
                    variant="light"
                    className="btn btn-link px-2 me-1"
                    onClick={() => {
                      dispatch(
                        updateMenuItem({ menuItem: item, qty: item.qty - 1 })
                      );
                      dispatch(
                        updateItemInCart({ cartItem: item, qty: item.qty - 1 })
                      );
                    }}
                    disabled={orderId}
                  >
                    <FontAwesomeIcon icon={faMinus} color="#000000" />
                  </Button>
                  <input
                    id="form1"
                    min="0"
                    name="quantity"
                    value={Number(item.qty).toString()}
                    type="number"
                    className="form-control form-control-sm text-center"
                    onChange={(e) => {
                      dispatch(
                        updateMenuItem({
                          menuItem: item,
                          qty: e.target.value,
                        })
                      );
                      dispatch(
                        updateItemInCart({
                          cartItem: item,
                          qty: e.target.value,
                        })
                      );
                    }}
                    disabled={orderId}
                  />

                  <Button
                    className="btn btn-link px-2 ms-1"
                    variant="light"
                    onClick={() => {
                      dispatch(
                        updateMenuItem({ menuItem: item, qty: item.qty + 1 })
                      );
                      dispatch(
                        updateItemInCart({ cartItem: item, qty: item.qty + 1 })
                      );
                    }}
                    disabled={orderId}
                  >
                    <FontAwesomeIcon icon={faPlus} color="#000000" />
                  </Button>

                  <Button
                    className="btn btn-link ms-3 px-3"
                    variant="light"
                    onClick={() => {
                      dispatch(removeMenuItem(item));
                      dispatch(removeItemFromCart(item));
                    }}
                    disabled={orderId}
                  >
                    <FontAwesomeIcon icon={faTrashCan} color="#000000" />
                  </Button>
                </div>
                <div className="mt-2">
                  <h5 className="text-end">
                    {formatVND(item.price * item.qty)}
                  </h5>
                </div>
              </Col>
            </Row>
          );
        })}
        <div>
          <h3 className="text-end">Total Price: {formatVND(price)}</h3>
        </div>
      </Stack>
    </>
  );
};

export default OrderCart;
