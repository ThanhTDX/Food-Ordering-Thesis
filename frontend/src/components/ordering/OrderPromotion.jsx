import axios from "axios";
import React, { useEffect, useState } from "react";
import Message from "../Message";
import { fetchAllPromotion } from "../../api/promotionApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import {
  Row,
  Col,
  Button,
  InputGroup,
  Form,
  Carousel,
  CardGroup,
  Card,
  CarouselItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../../slices/cartSlice";

import splitArrayIntoGroups from "../../utils/splitArrayIntoGroups"

const OrderPromotion = () => {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const { promotions } = cart.cartContent;
  const [fetchPromotion, setFetchPromotion] = useState([]);
  const [groupedFetchPromotion, setGroupedFetchPromotion] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    try {
      const fetchPromotionFunc = async () => {
        const response = await fetchAllPromotion();
        setFetchPromotion(response);
      };
      fetchPromotionFunc();
      setGroupedFetchPromotion(splitArrayIntoGroups(fetchPromotion, 3));
    } catch (e) {
      setError(e);
    }
  }, []);
  const handleSearch = (e) => {};

  const handleAddPromotion = () => {};

  return error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <Row>
        <Col md={9}>
          <Carousel>
            {groupedFetchPromotion.map((group, index) => (
              <Carousel.Item key={index}>
                <CardGroup>
                  {group.map((promotion) => (
                    <Card key={promotion._id}>
                      <Card.Title>{promotion.name}</Card.Title>
                      <Card.Body>
                        {promotion.discount_type === "FLAT" &&
                          `${promotion.amount}`}
                        {promotion.discount_type === "PERCENTAGE" &&
                          `${promotion.amount}K`}
                      </Card.Body>
                      <Card.Footer>{promotion.end_time}</Card.Footer>
                    </Card>
                  ))}
                </CardGroup>
              </Carousel.Item>
            ))}
          </Carousel>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Enter promo..."
              aria-label="Enter promo..."
              aria-describedby="promotion-addon"
              name="promo-name"
            />
            <Button
              variant=""
              id="promo-search-addon"
              onClick={handleSearch}
              className="border rounded-end"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} size="sm" />
            </Button>
          </InputGroup>
        </Col>
        <Col md={3}>
          <span>Applied Promotions: </span>
        </Col>
      </Row>
    </div>
  );
};

export default OrderPromotion;
