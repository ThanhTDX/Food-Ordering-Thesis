import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Stack, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addMenuItem } from "../slices/customMenuSlice";

function MenuItem({ item }) {
  const dispatch = useDispatch()
  const handleAddItemToCart = (item) => {
    console.log(item)
  }
  const handleAddItemToMenu = (item) => {
    dispatch(addMenuItem(item))
  }

  return (
    <Card className="my-3 p-3 rounded border-dark menu-item">
      <Link to={`/menu/${item._id}`}>
        <Card.Img src={item.image} />
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
            {item.food_tag.map((tag) => (
              <Button disabled className="m-1" key={tag}>
                {tag}
              </Button>
            ))}
          </div>
        </Stack>
      </Card.Body>
      <Card.Footer>
        <Container>
          <Row>
            <Col sm={6}>
              <Button
                variant="warning"
                className="btn btn-block w-100"
                onClick={() => handleAddItemToCart(item)}
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </Button>
            </Col>
            <Col sm={6}>
              <Button
                variant="warning"
                className="btn btn-block w-100"
                onClick={() => handleAddItemToMenu(item)}
              >
                <i className="fa-solid fa-book-open"></i>
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  );
}

export default MenuItem;
