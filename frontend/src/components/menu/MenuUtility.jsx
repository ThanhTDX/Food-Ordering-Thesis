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
import {
  fetchAllFoodTags,
  fetchAllFoodType,
  fetchAllComboType,
} from "../../api/menuApi";

import "./css/MenuUtility.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const MenuTag = ({ foodTag, menuSearchTags, handleUpdateTags }) => {
  return (
    <Card>
      <Card.Title>
        <h3>Tags</h3>
      </Card.Title>
      <Card.Body className="py-0">
        {foodTag && (
          <Row>
            {foodTag.slice(0, 6).map((tag) => (
              <Col key={tag._id} sm={6} md={4}>
                <Button
                  variant={""}
                  className={
                    "menu-utility--tag px-3 mb-1 w-100 " +
                    (menuSearchTags.includes(tag.name) ? "active" : "inactive")
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
      </Card.Body>
    </Card>
  );
};

const MenuType = ({ foodType, menuSearchType, handleUpdateType }) => {
  return (
    <Card>
      <Card.Title>
        {" "}
        <h3>Type</h3>
      </Card.Title>
      <Card.Body className="py-0">
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
            <Stack direction="vertical" gap={1}>
              <Row>
                {foodType.slice(0, 4).map((type) => {
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

              <Row>
                {foodType.slice(4, 8).map((type) => {
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
      </Card.Body>
    </Card>
  );
};

const MenuCombo = ({ comboType, menuSearchType, handleUpdateType }) => {
  return (
    <Card>
      <Card.Title>
        <h3>Combos</h3>
      </Card.Title>
      <Card.Body className="ps-0 py-0">
        {comboType && (
          <Stack gap={1} direction="vertical">
            {comboType.map((type) => (
              <Button
                variant={""}
                className={
                  "menu-utility--combo--type px-3 mb-1 w-100 " +
                  (menuSearchType === type.name ? "active" : "inactive")
                }
                onClick={() => {
                  handleUpdateType(type.name);
                }}
                key={type._id}
              >
                {type.name}
              </Button>
            ))}
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
};

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
  const [comboType, setComboType] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const [result1, result2, result3] = await Promise.all([
          fetchAllFoodTags(),
          fetchAllFoodType(),
          fetchAllComboType(),
        ]);
        setFoodTag(result1);
        setFoodType(result2);
        setComboType(result3);
      } catch (error) {
        if (error.response) setError(error.response.data);
        else setError(`Error: ${error.message}`);
      }
    };
    getData();
  }, []);
  return (
    <Container className="p-0 mb-4">
      <Row>
        <Col md={12} lg={5} className="">
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
        </Col>
        <Col xs={9} md={10} lg={5} className="p-0">
          <button></button>
        </Col>
        <Col xs={3} md={2} lg={2} className="">
          <Stack direction="horizontal" gap={2} className="">
            <Button
              variant="warning"
              className="btn btn-block w-100"
              onClick={() => handleMenuView("card")}
            >
              <i className="fa-solid fa-table"></i>
            </Button>
            <Button
              variant="warning"
              className="btn btn-block w-100"
              onClick={() => handleMenuView("list")}
            >
              <i className="fa-solid fa-list"></i>
            </Button>
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col xs={6} sm={6} md={6} lg={8} xl={8}>
          <MenuTag
            foodTag={foodTag}
            menuSearchTags={menuSearchTags}
            handleUpdateTags={handleUpdateTags}
          />
          <MenuType
            foodType={foodType}
            menuSearchType={menuSearchType}
            handleUpdateType={handleUpdateType}
          />
        </Col>
        <Col xs={6} sm={6} md={6} lg={4} xl={4}>
          <MenuCombo
            comboType={comboType}
            menuSearchType={menuSearchType}
            handleUpdateType={handleUpdateType}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MenuUtility;
