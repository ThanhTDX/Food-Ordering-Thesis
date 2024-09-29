import React, { useEffect, useState } from "react";
import { Container, Stack, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFoodTag } from "../slices/menuSlice";

const MenuUtility = () => {
  const dispatch = useDispatch();
  const [menuView, setMenuView] = useState("card");
  const [menuSearchKeyWord, setKeyWord] = useState("");
  const [menuSearchTags, setTags] = useState([]);
  const [menuSearchType, setType] = useState("");

  const foodTag = dispatch(fetchAllFoodTag())

  const handleUpdateTags = (item) => {
    const tagExist = menuSearchTags.find((tag) => tag === item);
    if (tagExist) menuSearchTags.filter((tag) => tag === item);
    else menuSearchTags.push(item);
  };

  useEffect(() => {
    
  }, [menuView, menuSearchKeyWord, menuSearchTags, menuSearchType]);

  return (
    <Container>
      <Stack direction="horizontal" gap={3}>
        <Form.Control
          type="text"
          className="me-auto"
          placeholder="Search..."
          id="searchKeyWordinput"
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <div className="vr" />
        <Button variant="outline-danger" onClick={() => setKeyWord("")}>
          Reset
        </Button>
      </Stack>
      <div>
        <h3>Change View</h3>
        <Row>
          <Col sm={6}>
            <Button
              variant="warning"
              className="btn btn-block w-100"
              onClick={() => setMenuView("card")}
            >
              <i className="fa-solid fa-table"></i>
            </Button>
          </Col>
          <Col sm={6}>
            <Button
              variant="warning"
              className="btn btn-block w-100"
              onClick={() => setMenuView("list")}
            >
              <i className="fa-solid fa-list"></i>
            </Button>
          </Col>
        </Row>
      </div>
      <div>
        <h3>Tags</h3>
        {/* <Container>
          <Row>
            {foodTag.map((tag) => (
              <Col>
                <Button
                  variant="secondary"
                  className="btn btn-block px-4 m-auto"
                  onClick={() => handleUpdateTags(tag.name)}
                  
                >
                  {tag.name}
                </Button>
              </Col>
            ))}
          </Row>
        </Container> */}
      </div>
      <div>
        <h3>Type</h3>
        <Row>
          <Col>
            <Button
              variant="secondary"
              className="btn btn-block px-4 m-auto"
              onClick={() => setType("Vegan")}
            >
              Vegan
            </Button>
          </Col>
          <Col>
            <Button
              variant="secondary"
              className="btn btn-block px-4 m-auto"
              onClick={() => setType("Breakfast")}
            >
              Breakfast
            </Button>
          </Col>
          <Col>
            <Button
              variant="secondary"
              className="btn btn-block px-4 m-auto"
              onClick={() => setType("Lunch")}
            >
              Lunch
            </Button>
          </Col>
          <Col>
            <Button
              variant="secondary"
              className="btn btn-block px-4 m-auto"
              onClick={() => setType("Dinner")}
            >
              Dinner
            </Button>
          </Col>
          <Col>
            <Button
              variant="secondary"
              className="btn btn-block px-4 m-auto"
              onClick={() => setType("Beverage")}
            >
              Beverage
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default MenuUtility;
