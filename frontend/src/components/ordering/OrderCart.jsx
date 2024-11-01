import React from "react";
import { Col, Row, Image, Button, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import "./css/OrderCart.css"


const OrderCart = () => {
  return (
    <>
      <div class="d-flex justify-content-between align-items-center mb-5">
        <h1 class="fw-bold mb-0">Shopping Cart</h1>
        <h6 class="mb-0 text-muted">3 items</h6>
      </div>
      <hr class="my-2"></hr>
      <Stack direction="vertical" gap={3}>
        <Row className="d-flex justify-content-between align-items-center order--item-list">
          <Col md={2} lg={2} xl={2}>
            <Image
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
              className="img-fluid rounded-3"
              alt="Cotton T-shirt"
            />
          </Col>
          <Col md={5} lg={6} xl={6} className="d-flex flex-column">
            <div>
              <h6>T-Shirt</h6>
            </div>
            <div>
              <h4>Super Cotton T-Shirt Long Sleeves</h4>
            </div>
          </Col>
          <Col md={4} lg={3} xl={3} className="d-flex flex-column">
            <div className="d-flex">
              <Button
                variant="light"
                className="btn btn-link px-2 me-1"
                onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
              >
                <FontAwesomeIcon icon={faMinus} color="#000000" />
              </Button>

              <input
                id="form1"
                min="0"
                name="quantity"
                value="1"
                type="number"
                className="form-control form-control-sm"
              />

              <Button
                className="btn btn-link px-2 ms-1"
                variant="light"
                onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
              >
                <FontAwesomeIcon icon={faPlus} color="#000000" />
              </Button>

              <Button
                className="btn btn-link ms-3 px-4"
                variant="light"
                onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
              >
                <FontAwesomeIcon icon={faTrashCan} color="#000000" />
              </Button>
            </div>
            <div className="mt-2">
              <h5 className="text-end">50.000</h5>
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between align-items-center order--item-list">
          <Col md={2} lg={2} xl={2}>
            <Image
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
              className="img-fluid rounded-3"
              alt="Cotton T-shirt"
            />
          </Col>
          <Col md={5} lg={6} xl={6} className="d-flex flex-column">
            <div>
              <h6>T-Shirt</h6>
            </div>
            <div>
              <h4>Super Cotton T-Shirt Long Sleeves</h4>
            </div>
          </Col>
          <Col md={4} lg={3} xl={3} className="d-flex flex-column">
            <div className="d-flex">
              <Button
                variant="light"
                className="btn btn-link px-2"
                onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
              >
                <FontAwesomeIcon icon={faMinus} color="#000000" />
              </Button>

              <input
                id="form1"
                min="0"
                name="quantity"
                value="1"
                type="number"
                className="form-control form-control-sm"
              />

              <Button
                className="btn btn-link px-2"
                variant="light"
                onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
              >
                <FontAwesomeIcon icon={faPlus} color="#000000" />
              </Button>

              <Button
                className="btn btn-link ms-3 px-4"
                variant="light"
                onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
              >
                <FontAwesomeIcon icon={faTrashCan} color="#000000" />
              </Button>
            </div>
            <div className="mt-2">
              <h5 className="text-end">50.000</h5>
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between align-items-center order--item-list">
          <Col md={2} lg={2} xl={2}>
            <Image
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
              className="img-fluid rounded-3"
              alt="Cotton T-shirt"
            />
          </Col>
          <Col md={5} lg={6} xl={6} className="d-flex flex-column">
            <div>
              <h6>T-Shirt</h6>
            </div>
            <div>
              <h4>Super Cotton T-Shirt Long Sleeves</h4>
            </div>
          </Col>
          <Col md={4} lg={3} xl={3} className="d-flex flex-column">
            <div className="d-flex">
              <Button
                variant="light"
                className="btn btn-link px-2"
                onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
              >
                <FontAwesomeIcon icon={faMinus} color="#000000" />
              </Button>

              <input
                id="form1"
                min="0"
                name="quantity"
                value="1"
                type="number"
                className="form-control form-control-sm"
              />

              <Button
                className="btn btn-link px-2"
                variant="light"
                onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
              >
                <FontAwesomeIcon icon={faPlus} color="#000000" />
              </Button>

              <Button
                className="btn btn-link ms-3 px-4"
                variant="light"
                onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
              >
                <FontAwesomeIcon icon={faTrashCan} color="#000000" />
              </Button>
            </div>
            <div className="mt-2">
              <h5 className="text-end">50.000</h5>
            </div>
          </Col>
        </Row>
        <div>
          <h3 className="text-end">Total Price: 150.000</h3>
        </div>
      </Stack>
    </>
  );
};

export default OrderCart;
