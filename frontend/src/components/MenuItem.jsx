import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Stack, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addMenuItem } from "../slices/customMenuSlice";

function MenuItem({ item }) {
  const dispatch = useDispatch();
  const handleAddItemToCart = (item) => {
    console.log(item);
    // TODO : create cartSlice and add this
  };
  const handleAddItemToMenu = (item) => {
    dispatch(addMenuItem(item));
  };

  const handleAddTag = (tag) => {
    console.log(tag);
    // TODO : change tag view and add this
  };

  return (
    <Card className="my-3 p-3 rounded border-dark menu-item">
      <Link to={`/menu/${item._id}`}>
        <Card.Img src={item.image} className="hover-zoom"/>
      </Link>

      <Card.Body>
        <Link to={`/menu/${item._id}`}>
          <Card.Title as="div" className="fs-4">
            <strong>{item.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as={"h5"} className="text-end">
          {item.price} VND
        </Card.Text>

        <Stack direction="vertical" gap={1}>
          <div className="" disabled>
            <p>
              <strong>Type: </strong>
              {item.food_type}
            </p>
          </div>
          <div className="" disabled>
            <p>
              <strong>Tags: </strong>
            </p>
            <Row>
              {item.food_tag.map((tag) => (
                <Col className="col-6">
                  <Button
                    className="menu-item--tag"
                    key={tag._id}
                    onClick={() => handleAddTag(tag)}
                  >
                    {tag}
                  </Button>
                </Col>
              ))}
            </Row>
          </div>
        </Stack>
      </Card.Body>
      <Card.Footer>
        <Stack direction="horizontal" gap={3}>
          <Button
            variant="warning"
            className="btn btn-block w-100"
            onClick={() => handleAddItemToCart(item)}
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </Button>
          <Button
            variant="warning"
            className="btn btn-block w-100"
            onClick={() => handleAddItemToMenu(item)}
          >
            <i className="fa-solid fa-book-open"></i>
          </Button>
        </Stack>
      </Card.Footer>
    </Card>
  );
}

export default MenuItem;
