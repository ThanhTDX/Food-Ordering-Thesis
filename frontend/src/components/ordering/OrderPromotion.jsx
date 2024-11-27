import axios from "axios";
import React, { useEffect, useState } from "react";
import Message from "../Message";
import { fetchAllPromotion } from "../../api/promotionApi";

import { Row, Col, Button, InputGroup, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../../slices/cartSlice";

const OrderPromotion = () => {
  const dispatch = useDispatch()
  const cart = useSelector(cartSelector)
  const {promotions} = cart.cartContent
  const [fetchPromotion, setFetchPromotion] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    try {
      const fetchPromotion = async () => {
        const response = await fetchAllPromotion();
        setFetchPromotion(response);
      };
      fetchPromotion();
    } catch (e) {
      setError(e);
    }
  }, []);

  useEffect(() => {
    console.log(fetchPromotion);
  }, [fetchPromotion]);

  const handleAddPromotion = () => {

  }

  return error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <Row>
        <Col md={9}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="promotion-addon">@</InputGroup.Text>
            <Form.Control
              placeholder="Enter promo..."
              aria-label="Enter promo..."
              aria-describedby="promotion-addon"
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <span>Applied Promotions: </span>
          <div>
            {fetchPromotion.map((promotion) => (
              <Button
                key={promotion._id}
                className="order-promotion__chosen"
                value={promotion.name}
              >
                <span>{promotion.name}</span>
              </Button>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OrderPromotion;
