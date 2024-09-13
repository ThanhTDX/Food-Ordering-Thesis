import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Menu({ menu }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${menu._id}`}>
        <Card.Img src={menu.image} />
      </Link>

      <Card.Body>
        <Link to={`/menu/${menu._id}`}>
          <Card.Title as="div">
            <strong>{menu.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as={"h3"}>${menu.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Menu;
