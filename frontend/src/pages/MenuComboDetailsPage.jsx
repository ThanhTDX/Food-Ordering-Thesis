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
import { fetchComboById } from "../api/menuApi";

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
import { menuSelector } from "../slices/menuSlice";
import StarRatingHoverable from "../components/StarRatingHoverable";

function ItemReview() {
  useEffect(() => {}, []);

  return <h4 className="m-0">Reviews</h4>;
}

function InputReview() {
  const reviewRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(reviewRef.current);
    console.log("formRef.current", formData);
    const values = Object.fromEntries(formData.entries());
    console.log("Form Values:", values);
  };

  return (
    <div className="menu-details--personal-comment">
      <Card>
        <Card.Header>
          <h4 className="m-0">Leave Review</h4>
        </Card.Header>
        <Card.Body>
          <Form ref={reviewRef} onSubmit={handleSubmit}>
            <Row>
              <Col md={6} lg={7}>
                <Form.Group className="" controlId="form-name">
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

              <Col md={6} lg={5}>
                <Stack direction="vertical" gap={1}>
                  <span className="lead">Rating</span>
                  <div className="text-end">
                    <StarRatingHoverable size={"md"} />
                  </div>
                </Stack>
              </Col>
            </Row>
            <Form.Group className="mt-2" controlId="form-context">
              <Form.Control
                as="textarea"
                rows={4}
                name="form-context"
                placeholder="Leave Your Review Here..."
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100 mt-2">
              SUBMIT
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

const MenuDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [item, setItem] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const fetchFood = async () => {
        const data = await fetchComboById(id);
        setLoading(false);
        console.log(data);
        setItem(data);
      };
      fetchFood();
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          <Row>
            <Col md={12} lg={7}>
              <Card>
                <Card.Header>
                  <Card.Img
                    src={item.image}
                    alt={item.image}
                    className="d-flex align-self-center menu-detail--image"
                  ></Card.Img>
                </Card.Header>
                <Card.Body className="">
                  <Stack gap={2} direction="vertical">
                    <Row>
                      <Col lg={8} md={12}>
                        <h1 className="m-0">{item.name}</h1>
                      </Col>
                      <Col lg={4} md={12}>
                        <div className="text-end">
                          <h2 className="mb-2">
                            <span>{formatVND(item.price)}</span>
                          </h2>
                        </div>
                        <div className="d-flex justify-content-end">
                          <StarRating item={item} size={"xl"} />
                        </div>
                      </Col>
                    </Row>
                    <Row className="">
                      <Col md={12} lg={4}>
                        <Stack gap={1} direction="vertical">
                          <Row className="d-flex align-items-center justify-content-between">
                            {item.tag.map((tag) => {
                              return (
                                <Col
                                  md={6}
                                  lg={4}
                                  className="my-1 px-1"
                                  key={tag._id}
                                >
                                  <Button
                                    variant=""
                                    className="w-100 p-0 menu-detail--card--tag"
                                  >
                                    <span>{tag.name}</span>
                                  </Button>
                                </Col>
                              );
                            })}
                          </Row>
                          <Button
                            variant=""
                            className="menu-detail--card--type"
                          >
                            <span>{item.type.name}</span>
                          </Button>
                        </Stack>
                      </Col>
                      <Col md={12} lg={4} className="offset-lg-4">
                        <Stack gap={2} direction="vertical">
                          <Button
                            variant="success"
                            className="d-block w-100"
                            onClick={() => dispatch(addMenuItem(item))}
                          >
                            ADD TO PERSONAL MENU
                          </Button>
                        </Stack>
                      </Col>
                    </Row>
                  </Stack>
                </Card.Body>
                <Card.Footer>
                  <Row>
                    <Col md={12} lg={6}>
                      <ItemReview />
                    </Col>
                    <Col md={12} lg={6}>
                      <InputReview />
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
            <Col md={12} lg={5}>
              <CustomMenu />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default MenuDetailsPage;
