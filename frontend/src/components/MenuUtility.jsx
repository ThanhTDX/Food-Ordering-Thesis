import React, { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Form,
  Button,
  Row,
  Col,
  Dropdown,
  Collapse,
} from "react-bootstrap";
import { fetchAllFoodTags, fetchAllFoodType } from "../api/menuApi";

const MenuUtility = ({ setMenuView, setKeyWord, setTags, setType }) => {
  const [foodTypeCollapse, setfoodTypeCollapse] = useState(false);

  const [foodTag, setFoodTag] = useState(null);
  const [foodType, setFoodType] = useState(null);
  const [error, setError] = useState(null);

  const handleMenuView = (item) => {
    setMenuView(item);
  };

  const handleUpdateKeyWord = (item) => {
    setKeyWord(item);
  };

  const handleUpdateTags = (item) => {
    // const tagExist = menuSearchTags.find((tag) => tag === item);
    // if (tagExist) menuSearchTags.filter((tag) => tag === item);
    // else menuSearchTags.push(item);
    setTags(item);
  };

  const handleUpdateType = (item) => {
    setType(item);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const [result1, result2] = await Promise.all([
          fetchAllFoodTags(),
          fetchAllFoodType(),
        ]);
        setFoodTag(result1);
        setFoodType(result2);
      } catch (error) {
        if (error.response) setError(error.response.data);
        else console.log(`Error: ${error.message}`);
      }
    };
    getData();
  }, []);

  function MenuTag() {
    return (
      <div>
        <h3>Tags</h3>
        {foodTag && (
          <Row>
            {foodTag.map((tag) => (
              <Col>
                <Button
                  variant="secondary"
                  className="btn btn-block px-3 m-auto"
                  key={tag._id}
                  onClick={() => handleUpdateTags(tag.name)}
                >
                  {tag.name}
                </Button>
              </Col>
            ))}
          </Row>
        )}
      </div>
    );
  }

  function MenuType() {
    return (
      <div>
        <h3>Type</h3>
        {foodType && foodType.length < 5 && (
          <Row>
            {foodType.map((type) => {
              return (
                <Col>
                  <Button
                    variant="secondary"
                    className="btn btn-block px-3 w-100"
                    key={type._id}
                    onClick={() => setType("Vegan")}
                  >
                    {type.name}
                  </Button>
                </Col>
              );
            })}
          </Row>
        )}
        {foodType && foodType.length > 5 && (
          <>
            <Stack direction="horizontal" gap={2}>
              {foodType.slice(0, 3).map((type) => {
                return (
                  <Col>
                    <Button
                      variant="secondary"
                      className="btn btn-block px-3 w-100"
                      key={type._id}
                      onClick={() => setType(type.name)}
                    >
                      {type.name}
                    </Button>
                  </Col>
                );
              })}
              <Button
                onClick={() => setfoodTypeCollapse(!foodTypeCollapse)}
                aria-controls="example-collapse-text"
                aria-expanded={foodTypeCollapse}
              >
                click
              </Button>
            </Stack>
            <Collapse in={foodTypeCollapse}>
              <div id="example-collapse-text">
                <Stack direction="horizontal" gap={2}>
                  <Button variant="secondary">Vegan</Button>
                  <Button variant="secondary">Vegan</Button>
                  <Button variant="secondary">Vegan</Button>
                </Stack>
                <Stack direction="horizontal" gap={2}>
                  <Button variant="secondary">Vegan</Button>
                  <Button variant="secondary">Vegan</Button>
                  <Button variant="secondary">Vegan</Button>
                </Stack>
              </div>
            </Collapse>
          </>
        )}
      </div>
    );
  }

  return (
    <Container>
      <Stack direction="horizontal" gap={2}>
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
        <Button
          variant="warning"
          className="btn btn-block"
          onClick={() => setMenuView("card")}
        >
          <i className="fa-solid fa-table"></i>
        </Button>
        <Button
          variant="warning"
          className="btn btn-block"
          onClick={() => setMenuView("list")}
        >
          <i className="fa-solid fa-list"></i>
        </Button>
      </Stack>
      <MenuTag />
      <MenuType />
    </Container>
  );
};

export default MenuUtility;
