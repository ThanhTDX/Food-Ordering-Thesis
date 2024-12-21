import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Col, Row, Image, Button, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import "./css/OrderCart.css";
import { removeMenuItem, updateMenuItem } from "../../slices/customMenuSlice";
import {
  cartSelector,
  updateItemInCart,
  removeItemFromCart,
  clearCart,
  setCartToCustomMenu,
} from "../../slices/cartSlice";

import formatVND from "../../utils/formatVND";

const OrderCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    // Only dispatch if the query parameter is present and the cart hasn't been set yet
    if (queryParams?.get("checkout") === "customMenu") {
      // Only dispatch if not already set, this prevents an infinite loop
      dispatch(setCartToCustomMenu());
    }
  }, [dispatch]);

  // All methods regarding cart adjustments will be disabled once
  // payment has been finished
  const { items, price, promotions, discountedPrice } = cart.cartContent;
  const { paid } =cart.status

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <span className="h1 fw-bold mb-0">Order Cart</span>
        <span className="h6 mb-0 text-muted">{items.length} items</span>
      </div>
      <div className="text-end">
        <Button
          variant="light"
          className="me-2"
          onClick={() => dispatch(clearCart())} 
          disabled={paid}
        >
          <span>Clear Cart</span>
        </Button>
        <Button
          variant="light"
          className="ms-2"
          onClick={() => dispatch(setCartToCustomMenu())}
          disabled={paid}
        >
          <span>Set Cart To Personal Menu</span>
        </Button>
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
                        updateItemInCart({ cartItem: item, qty: item.qty - 1 })
                      );
                    }}
                    disabled={paid}
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
                        updateItemInCart({
                          cartItem: item,
                          qty: e.target.value,
                        })
                      );
                    }}
                    disabled={paid}
                  />

                  <Button
                    className="btn btn-link px-2 ms-1"
                    variant="light"
                    onClick={() => {
                      dispatch(
                        updateItemInCart({ cartItem: item, qty: item.qty + 1 })
                      );
                    }}
                    disabled={paid}
                  >
                    <FontAwesomeIcon icon={faPlus} color="#000000" />
                  </Button>

                  <Button
                    className="btn btn-link ms-3 px-3"
                    variant="light"
                    onClick={() => {
                      dispatch(removeItemFromCart(item));
                    }}
                    disabled={paid}
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
