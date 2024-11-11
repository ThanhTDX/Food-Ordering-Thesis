import React, { useEffect, useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faCartShopping,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

import Loader from "../components/Loader";
import Message from "../components/Message";
import StarRating from "../components/StarRating";
import CustomMenu from "../components/customMenu/CustomMenu";
import Toasts from "../components/Toasts";

import { addMenuItem } from "../slices/customMenuSlice";
import { fetchFoodById } from "../api/menuApi";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Stack,
  Form,
} from "react-bootstrap";

import formatVND from "../utils/formatVND";

import "./static/css/MenuDetailsPage.css";
import { addItemToCart } from "../slices/cartSlice";


const MenuDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [item, setItem] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [toasts, setToasts] = useState([]);

  const reviewRef = useRef();

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const data = await fetchFoodById(id);
        setItem(data);
      } catch (e) {
        setError(e);
      }
    };
    fetchMenuItem();
    setLoading(false)
  }, []);

  useEffect(() => {});

  const handleAddItemToCart = (item) => {
    dispatch(addItemToCart(item));
    // TODO : create cartSlice and add this
  };

  const handleAddItemToMenu = (item) => {
    dispatch(addMenuItem(item));

    // TODO : create toasts functionality
    // const ADD = "ADD";
    // const message = {
    //   data: item,
    //   type: ADD,
    // };
    // handleNewToasts(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(reviewRef.current);
    console.log("formRef.current", formData);
    const values = Object.fromEntries(formData.entries());
    console.log("Form Values:", values);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          <Row>
            <Col md={8} lg={8}>
              <Card>
                <Card.Header>
                  <Card.Img
                    src={item.image}
                    alt={item.name}
                    className="d-flex align-self-center menu-detail--image"
                  ></Card.Img>
                </Card.Header>
                <Card.Body className="">
                  <div className="d-flex align-items-center justify-content-between">
                    <h1 className="m-0">{item.name}</h1>
                    <div>
                      <h2 className="mb-2">{formatVND(item.price)}</h2>
                      <StarRating item={item} size={"xl"} />
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between"></div>
                  <Row className="mt-2">
                    <Col md={12} lg={8}>
                      <Stack gap={2} direction="vertical">
                        <Row>
                          {item.tag.map((tag) => {
                            return (
                              <Col md={6} lg={4} className="my-1" key={tag._id}>
                                <Button variant="light" className="w-100">
                                  <span>{tag.name}</span>
                                </Button>
                              </Col>
                            );
                          })}
                        </Row>
                        <div>
                          <span>Food Type: {item.food_type}</span>
                        </div>
                      </Stack>
                    </Col>
                    <Col md={12} lg={4}>
                      <Stack gap={2} direction="vertical">
                        <Button
                          variant="success"
                          className="d-block w-100"
                          onClick={() => handleAddItemToCart(item)}
                        >
                          ADD TO CART
                        </Button>

                        <Button
                          variant="success"
                          className="d-block w-100"
                          onClick={() => handleAddItemToMenu(item)}
                        >
                          ADD CUSTOM MENU
                        </Button>
                      </Stack>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <Row>
                    <Col md={12} lg={6}>
                      <h4>Reviews</h4>
                    </Col>
                    <Col md={12} lg={6}>
                      <div className="menu-details--personal-comment">
                        <Card>
                          <Card.Header>
                            <h4 className="m-0">Leave Review</h4>
                          </Card.Header>
                          <Card.Body>
                            <Form ref={reviewRef} onSubmit={handleSubmit}>
                              <Row>
                                <Col md={12} lg={8}>
                                  <Form.Group
                                    className=""
                                    controlId="form-name"
                                  >
                                    <Form.Label>
                                      <span className="">Your Name</span>
                                    </Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="form-name"
                                      placeholder="Enter Name..."
                                    />
                                  </Form.Group>
                                </Col>

                                <Col md={12} lg={4}>
                                  <p className="lead">Rating</p>
                                  <div className="text-end">
                                    <FontAwesomeIcon icon={faStarRegular} />
                                    <FontAwesomeIcon icon={faStarRegular} />
                                    <FontAwesomeIcon icon={faStarRegular} />
                                    <FontAwesomeIcon icon={faStarRegular} />
                                    <FontAwesomeIcon icon={faStarRegular} />
                                  </div>
                                </Col>
                              </Row>
                              <Form.Group
                                className="mt-2"
                                controlId="form-context"
                              >
                                <Form.Control
                                  as="textarea"
                                  rows={4}
                                  name="form-context"
                                  placeholder="Leave Your Review Here..."
                                />
                              </Form.Group>
                              <Button
                                type="submit"
                                variant="primary"
                                className="w-100 mt-2"
                              >
                                SUBMIT
                              </Button>
                            </Form>
                          </Card.Body>
                        </Card>
                      </div>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
            <Col md={4} lg={4}>
              <CustomMenu />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default MenuDetailsPage;
