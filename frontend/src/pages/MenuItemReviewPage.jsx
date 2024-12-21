import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Container,
  Image,
  Stack,
  Button,
} from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { fetchFoodById } from "../api/menuApi";
import formatVND from "../utils/formatVND";
import Loader from "../components/Loader";
import Pageing from "../components/Pageing";

import { fetchFoodCommentById } from "../api/menuApi";
import avatar from "./static/img/avatar.svg";
import StarRating from "../components/StarRating";

const MenuItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async (id) => {
      try {
        const data = await fetchFoodById(id);
        setLoading(false);
        setItem(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    fetchFood(id);
  }, []);

  return loading ? (
    <Loader width={50} height={50} />
  ) : (
    <>
      <Card className="menu-item--card mb-2">
        <Card.Header>
          <Container className="position-relative p-0">
            <div className="z-1 position-absolute w-100 p-1">
              <div className="d-flex justify-content-between align-items-center">
                {/* TODO: promotion conditioning */}
                <span className="menu-item--card--promotion">-25%</span>
                {/* TODO: isHot conditioning */}
                {item.is_hot && (
                  <span className="menu-item--card--hot">!HOT</span>
                )}
              </div>
            </div>
            <Link to={`/menu/item/${item._id}`} className="z-0">
              <div className="position-relative menu-item--card--image">
                <Card.Img
                  src={item.image}
                  alt={item.name}
                  className="d-flex align-self-center"
                />
                <div className="menu-item--card--image__mask position-absolute top-0 start-0 d-flex justify-content-center align-items-center w-100 h-100 text-white fs-5"></div>
              </div>
            </Link>
          </Container>
        </Card.Header>
        <Card.Body>
          <Container className="product-detail-container p-0">
            <div className="d-flex justify-content-between align-items-center">
              <Link
                to={`/menu/item/${item._id}`}
                className="text-decoration-none"
              >
                <h5 className="menu-item--card--title">{item.name}</h5>
              </Link>
              <div className="d-flex flex-column">
                {/* TODO: CHANGE PRICE COLOR + PROMOTION CONDITIONING */}
                <span className="new-price">{formatVND(item.price)}</span>
                <span className="old-price align-self-end">
                  <small className="">
                    <s>{formatVND(item.price)}</s>
                  </small>
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Stack gap={2} direction="vertical">
                <Stack
                  gap={1}
                  direction="horizontal"
                  className="d-flex flex-wrap"
                >
                  {item.tag
                    .slice(0, item.tag.length > 3 ? 3 : item.tag.length)
                    .map((tag) => {
                      return (
                        <Button
                          variant={""}
                          className={"p-1 py-0 menu-item--card--tag inactive"}
                          key={tag._id}
                        >
                          <span>{tag.name}</span>
                        </Button>
                      );
                    })}
                </Stack>
                {/* {item.tag.length >= 3 && (
                <Stack gap={2} direction="horizontal">
                  {item.tag
                    .slice(3, item.tag.length > 6 ? 6 : item.tag.length)
                    .map((tag) => {
                      return (
                        <Button
                          variant={
                            menuSearchTags.includes(tag.name)
                              ? "danger"
                              : "secondary"
                          }
                          className="menu-item--card--tag p-1 py-0 "
                          onClick={() => handleAddTag(tag.name)}
                          key={tag._id}
                        >
                          <span>{tag.name}</span>
                        </Button>
                      );
                    })}
                </Stack>
              )} */}
              </Stack>
              {/* <StarRating item={item} size={"2xs"} /> */}
            </div>
            <div className="d-flex justify-content-between align-items-center mt-1">
              <Button
                variant={""}
                className="menu-item--card--type w-100 me-3 flex-1 inactive"
              >
                <span>{item.type.name}</span>
              </Button>
              {/* <Stack gap={2} direction="horizontal" className="">
              <Button
                variant=""
                className="menu-item--add-to-cart w-100"
                onClick={() => dispatch(addItemToCart(item))}
              >
                <FontAwesomeIcon icon={faCartShopping} />
              </Button>
            </Stack> */}
            </div>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

const MenuItemReviewPage = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(true);
  const [itemPerPage, setItemPerpage] = useState(10);
  const indexOfLastItem =
    currentPage * itemPerPage > reviews.length
      ? reviews.length
      : currentPage * itemPerPage;
  const indexOfFirstItem = (currentPage - 1) * itemPerPage;
  const currentReviewList = reviews.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    try {
      const fetchReviews = async () => {
        const data = await fetchFoodCommentById(id);
        setLoading(false);
        setReviews(data);
      };
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Container className="">
      <Row className="d-flex justiy-content-center">
        <Col md={12} lg={5} xl={4}>
          <Row>
            <Col md={2} lg={12} xl={12} className="mb-lg-2 mb-xl-2">
              <Link to={`/menu/item/${id}/`}>
                <FontAwesomeIcon icon={faArrowLeft} size="md" />
                <span className="ms-2">Go Back</span>
              </Link>
            </Col>
            <Col md={10} lg={8} xl={8} className="offset-lg-2 offset-xl-2">
              <MenuItem />
            </Col>
          </Row>
        </Col>
        <Col md={12} lg={7} xl={8}>
          <Card>
            <Card.Body className="p-4 text-center">
              <span className="h4 text-center mb-4 pb-2">Comments</span>
            </Card.Body>
            <Stack direction="vertical" gap={2}>
              {currentReviewList.map((review) => {
                return (
                  <div className="d-flex flex-start align-items-center">
                    <Image
                      src={avatar}
                      alt="Avatar.svg"
                      roundedCircle
                      width={50}
                      height={50}
                    />
                    <div className="flex-grow-1 flex-shrink-1">
                      <div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="mb-1 d-flex justify-content-start">
                            <span className="fw-bold me-2">
                              {review.commenter_name}
                            </span>
                            <StarRating
                              rating={review.star_rating}
                              size={"2xs"}
                            />
                          </div>
                          <div className="text-secondary text-end menu-detail-comment-date">
                            <div>{review.date_created.split("T")[0]}</div>
                            <div>
                              {review.date_created.split("T")[1].split(".")[0]}
                            </div>
                          </div>
                          {/* <a href="#!">
                                <FontAwesomeIcon icon={faReply} size={"xs"} />
                                <span className="small"> reply</span>
                              </a> */}
                        </div>
                        <p className="mb-0">{review.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Stack>
            <Card.Footer>
              <Pageing
                items={reviews}
                itemPerPage={itemPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MenuItemReviewPage;
