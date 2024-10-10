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
  InputGroup,
} from "react-bootstrap";
import { fetchAllFoodTags, fetchAllFoodType } from "../../api/menuApi";

const MenuUtility = ({
  handleMenuView,
  handleUpdateKeyWord,
  menuSearchTags,
  handleUpdateTags,
  menuSearchType,
  handleUpdateType,
}) => {
  const [foodTypeCollapse, setfoodTypeCollapse] = useState(false);
  const [foodTag, setFoodTag] = useState([]);
  const [foodType, setFoodType] = useState([]);

  const [error, setError] = useState(null);

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
        else setError(`Error: ${error.message}`);
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
              <Col key={tag._id}>
                <Button
                  variant={
                    menuSearchTags.includes(tag.name) ? "danger" : "secondary"
                  }
                  className="btn btn-block px-3 m-auto"
                  onClick={() => {handleUpdateTags(tag.name);}}
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
                <Col key={type._id}>
                  <Button
                    variant={
                      menuSearchType === type.name ? "danger" : "secondary"
                    }
                    className="btn btn-block px-3 w-100"
                    key={type._id}
                    onClick={() => handleUpdateType(type.name)}
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
                  <Col key={type._id}>
                    <Button
                      variant={
                        menuSearchType === type.name ? "danger" : "secondary"
                      }
                      className="btn btn-block px-3 w-100"
                      key={type._id}
                      onClick={() => handleUpdateType(type.name)}
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
    <Container className="p-0 mb-4">
      <Stack direction="horizontal" gap={2}>
        <InputGroup>
          <Form.Control
            type="search"
            className="me-auto"
            placeholder="Search..."
            id="searchKeyWordinput"
            onChange={(e) => handleUpdateKeyWord(e.target.value)}
          />
          <div className="vr" />
          <Button
            variant="outline-danger"
            onClick={() => handleUpdateKeyWord(null)}
          >
            Reset
          </Button>
        </InputGroup>

        <Button
          variant="warning"
          className="btn btn-block"
          onClick={() => handleMenuView("card")}
        >
          <i className="fa-solid fa-table"></i>
        </Button>
        <Button
          variant="warning"
          className="btn btn-block"
          onClick={() => handleMenuView("list")}
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
