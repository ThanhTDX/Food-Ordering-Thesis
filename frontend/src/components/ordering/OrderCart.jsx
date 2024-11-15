import React from "react";
import { Col, Row, Image, Button, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import "./css/OrderCart.css";
import {
  customMenuSelector,
  removeMenuItem,
  updateMenuItem,
} from "../../slices/customMenuSlice";
import { useDispatch, useSelector } from "react-redux";
import formatVND from "../../utils/formatVND";

const OrderCart = () => {
  const dispatch = useDispatch();
  const { menu, price } = useSelector(customMenuSelector);
  const { menuItems, menuCombo } = menu;
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="fw-bold mb-0">Ordering Cart</h1>
        <h6 className="mb-0 text-muted">
          {menuItems.length + menuCombo.length} items
        </h6>
      </div>
      <hr className="my-2"></hr>
      <Stack direction="vertical" gap={3}>
        {menuItems.map((item) => {
          return (
            <Row
              className="d-flex justify-content-between align-items-center order--item-list"
              key={item._id}
            >
              <Col md={2} lg={2} xl={2}>
                <Image
                  src={item.image}
                  className="img-fluid rounded-3"
                  alt="Cotton T-shirt"
                />
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
                    onClick={() =>
                      dispatch(
                        updateMenuItem({ menuItem: item, qty: item.qty - 1 })
                      )
                    }
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
                    onChange={(e) =>
                      dispatch(
                        updateMenuItem({
                          menuItem: item,
                          qty: e.target.value,
                        })
                      )
                    }
                  />

                  <Button
                    className="btn btn-link px-2 ms-1"
                    variant="light"
                    onClick={() =>
                      dispatch(
                        updateMenuItem({ menuItem: item, qty: item.qty + 1 })
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faPlus} color="#000000" />
                  </Button>

                  <Button
                    className="btn btn-link ms-3 px-4"
                    variant="light"
                    onClick={() => dispatch(removeMenuItem(item))}
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
