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
  Accordion,
  InputGroup,
  Card,
} from "react-bootstrap";
import { fetchAllFoodTags, fetchAllFoodType } from "../../api/menuApi";

import "./css/MenuUtility.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

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
  const [foodType, setFoodType] = useState("");
  const [combo, setCombo] = useState("");

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
              <Col key={tag._id} sm={6} md={4}>
                <Button
                  variant={""}
                  className={
                    "menu-utility--tag px-3 mb-1 w-100 " +
                    (menuSearchTags.includes(tag.name)
                      ? "active"
                      : "inactive")
                  }
                  onClick={() => {
                    handleUpdateTags(tag.name);
                  }}
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

  function MenuCombo() {
    return <Card>MenuCombo</Card>;
  }

  function MenuType() {
    return (
      <Card>
        <h3>Type</h3>
        {foodType && foodType.length < 5 && (
          <Row>
            {foodType.map((type) => {
              return (
                <Col key={type._id}>
                  <Button
                    variant={""}
                    className={
                      "btn btn-block px-3 w-100 menu-utility--type " +
                      (menuSearchType === type.name ? "active" : "inactive")
                    }
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
                      variant={""}
                      className={
                        "btn btn-block px-3 w-100 menu-utility--type " +
                        (menuSearchType === type.name ? "active" : "inactive")
                      }
                      key={type._id}
                      onClick={() => handleUpdateType(type.name)}
                    >
                      {type.name}
                    </Button>
                  </Col>
                );
              })}
              {/* <Button
                onClick={() => setfoodTypeCollapse(!foodTypeCollapse)}
                className=""
                aria-controls="food-type-collapse"
                aria-expanded={foodTypeCollapse}
              >
                <FontAwesomeIcon icon={faArrowDown}/>
              </Button> */}
            </Stack>
            {/* <Accordion defaultActiveKey={0}>
              <Accordion.Item eventKey="0">
                
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
              </Accordion.Item>
            </Accordion> */}
          </>
        )}
      </Card>
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
      <Row>
        <Col xs={6} sm={6} md={6} lg={8} xl={8}>
          <MenuTag />
          <MenuType />
        </Col>
        <Col xs={6} sm={6} md={6} lg={4} xl={4}>
          <MenuCombo />
        </Col>
      </Row>
    </Container>
  );
};

export default MenuUtility;
