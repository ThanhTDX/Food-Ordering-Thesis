import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

import Loader from "../components/Loader";
import Message from "../components/Message";
import StarRating from "../components/StarRating";
import CustomMenu from "../components/customMenu/CustomMenu";
import Toasts from "../components/Toasts";

import { addMenuItem } from "../slices/customMenuSlice";
import { fetchFoodById, fetchFoodCommentById } from "../api/menuApi";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Stack,
  Form,
  Image,
} from "react-bootstrap";

import formatVND from "../utils/formatVND";

import "./static/css/MenuItemDetailsPage.css";
import StarRatingHoverable from "../components/StarRatingHoverable";
import avatar from "./static/img/avatar.svg";

function ItemReview({ item }) {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    try {
      const fetchReviews = async () => {
        const data = await fetchFoodCommentById(id);
        const sortedData = data.sort((a, b) => {
          return new Date(b.date_created) - new Date(a.date_created); // Compare dates in descending order
        });
        console.log(sortedData);
        setReviews(sortedData.slice(0,4));
      };
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Card>
        <Card.Header>
          <h4 className="m-0">Reviews</h4>
        </Card.Header>
      </Card>
      <Card.Body className="menu-detail-comment-body p-2">
        <Stack direction="vertical" gap={1}>
          {
            reviews.length === 0 && <Card>
              <Card.Body className="text-center">
                <div className="fw-bold ">There's no comments about this food</div>
                <div>Be the first to comment!</div>
              </Card.Body>
            </Card>
          }
          {reviews.map((review) => {
            return (
              <Card className="border rounded-3 pe-1">
                <Card.Header className="d-flex justify-content-between align-items-center p-0 px-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <Image
                      src={avatar}
                      alt="Avatar.svg"
                      roundedCircle
                      width={30}
                      height={30}
                    />
                    <div className="ms-2">
                      <h6 className="fw-bold m-0">{review.commenter_name}</h6>
                      <StarRating rating={review.star_rating} size={"2xs"} />
                    </div>
                  </div>
                  <div className="text-secondary text-end menu-detail-comment-date">
                    <div>{review.date_created.split("T")[0]}</div>
                    <div>{review.date_created.split("T")[1].split(".")[0]}</div>
                  </div>
                </Card.Header>
                <Card.Body className="border-0 p-0 ps-2">
                  {review.description}
                </Card.Body>
              </Card>
            );
          })}
        </Stack>
        <div className="text-end">
          <Link to={`/menu/item/${item._id}/review/`}>
            <span>Read More...</span>
          </Link>
        </div>
      </Card.Body>
    </div>
  );
}

function InputReview() {
  const { id } = useParams();
  const reviewRef = useRef();

  const [rating, setRating] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const reloadPage = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const axiosPostCall = useCallback(
    async (form) => {
      try {
        setSuccess(false);
        setLoading(true);
        setError("");
        const response = await axios.post(
          "/api/menu/comment/create/",
          {
            food: id,
            username: form["form-name"],
            description: form["form-context"],
            star_rating: rating,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = response.data;
        console.log(responseData);
        setLoading(false);
        setSuccess(true);
        reloadPage();
      } catch (error) {
        setLoading(false);
        setError("There's an error uploading your comment");
        console.error(error);
      }
    },
    [id, rating]
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(reviewRef.current);
    const values = Object.fromEntries(formData.entries());
    console.log("Form Values:", values);
    axiosPostCall(values);
  };

  return (
    <div className="menu-details--personal-comment">
      <Card className="">
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
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6} lg={5}>
                <Stack direction="vertical" gap={1}>
                  <span className="lead">Rating</span>
                  <div className="text-end">
                    <StarRatingHoverable
                      size={"lg"}
                      fixedIndex={rating}
                      setFixedIndex={setRating}
                    />
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
            {loading && <Loader height={25} width={25} />}
            {error && (
              <Message variant={"danger"}>
                <FontAwesomeIcon
                  icon={faX}
                  style={{ color: "#c32222" }}
                  size="xl"
                />
                <span className="ms-2">
                  There's an error uploading your comment.
                </span>
              </Message>
            )}
            {success && (
              <Message variant={"success"}>
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "#55d64c" }}
                  size="xl"
                />
                <span className="ms-2">
                  Your Comment has been sent successfully!
                </span>
              </Message>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

const MenuItemDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [item, setItem] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const fetchFood = async () => {
        const data = await fetchFoodById(id);
        setLoading(false);
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
            <Col md={12} lg={8}>
              <Card>
                <Card.Header className="p-0">
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
                      <ItemReview item={item} />
                    </Col>
                    <Col md={12} lg={6}>
                      <InputReview />
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
            <Col md={12} lg={4}>
              <CustomMenu />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default MenuItemDetailsPage;
