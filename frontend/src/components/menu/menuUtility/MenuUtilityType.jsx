import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';

import {Card, Row, Col, Button} from "react-bootstrap"

const MenuUtilityType = () => {
  const [foodType, setFoodType] = useState([]);
  const [foodTypeCollapse, setfoodTypeCollapse] = useState(false);
  
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
}

export default MenuUtilityType