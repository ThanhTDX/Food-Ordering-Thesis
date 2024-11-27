import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Stack,
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  Card,
  Carousel,
} from "react-bootstrap";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import {
  menuSelector,
  updateSearchCombo,
  updateSearchKeyword,
  updateSearchTags,
  updateSearchType,
  updateView,
  updateLowerPrice,
  updateUpperPrice,
} from "../../slices/menuSlice";

import "./css/MenuUtility.css";

import splitArrayIntoGroups from "../../utils/splitArrayIntoGroups"



const MenuKeyword = ({ searchKeyword }) => {
  const dispatch = useDispatch();
  return (
    <InputGroup>
      <Form.Control
        type="search"
        className="me-auto"
        placeholder="Search..."
        id="searchKeyWordinput"
        onChange={(e) => dispatch(updateSearchKeyword(e.target.value))}
      />
    </InputGroup>
  );
};

const MenuPrice = ({priceRange}) => {
  const dispatch = useDispatch();
  return (
    <Stack direction="horizontal" gap={2}>
      <InputGroup>
        <Form.Control
          type="number"
          className="me-auto"
          value={priceRange.lower}
          id="priceRangeLowerInput"
          onChange={(e) => dispatch(updateLowerPrice(e.target.value))}
        />
      </InputGroup>
      <div>
        <span>-</span>
      </div>
      <InputGroup>
        <Form.Control
          type="number"
          className="me-auto"
          value={priceRange.upper}
          id="priceRangeUpperInput"
          onChange={(e) => dispatch(updateUpperPrice(e.target.value))}
        />
      </InputGroup>
    </Stack>
  );
}

const MenuView = ({ view }) => {
  const dispatch = useDispatch()
  return (
    <Stack direction="horizontal" gap={2} className="">
      <Button
        variant="warning"
        className="btn btn-block w-100"
        onClick={() => dispatch(updateView("card"))}
      >
        <i className="fa-solid fa-table"></i>
      </Button>
      <Button
        variant="warning"
        className="btn btn-block w-100"
        onClick={() => dispatch(updateView("list"))}
      >
        <i className="fa-solid fa-list"></i>
      </Button>
    </Stack>
  );
};

const MenuTag = ({ searchTags, allTags }) => {
  const dispatch = useDispatch();

  // Splitting items into groups of 6
  const groups = splitArrayIntoGroups(allTags, 6);
  return (
    <Card>
      <Card.Title className="m-1">
        <span>Tags</span>
      </Card.Title>
      <Card.Body className="p-0">
        <Carousel interval={null}>
          {groups.map((group, index) => (
            <Carousel.Item key={index}>
              <Row className="px-4">
                {group.slice(0, 6).map((tag) => (
                  <Col key={tag._id} sm={6} md={4} className="px-1">
                    <Button
                      variant={""}
                      className={
                        "menu-utility--tag p-0 w-100 " +
                        (searchTags.includes(tag.name) ? "active" : "inactive")
                      }
                      onClick={() => {
                        dispatch(updateSearchTags(tag.name));
                      }}
                    >
                      {tag.name}
                    </Button>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Card.Body>
    </Card>
  );
};

const MenuType = ({ searchType, allTypes }) => {
  const dispatch = useDispatch();

  // Splitting items into groups of 6
  const groups = splitArrayIntoGroups(allTypes, 6);
  return (
    <Card>
      <Card.Title className="m-1">
        {" "}
        <span>Type</span>
      </Card.Title>

      <Card.Body className="p-0">
        {" "}
        <Carousel interval={null}>
          {groups.map((group, index) => (
            <Carousel.Item className="h-100" key={index}>
              <Row className="px-4 d-flex align-items-center justify-content-between">
                {group.map((type) => {
                  return (
                    <Col key={type._id} sm={6} md={4} className="px-1">
                      <Button
                        variant={""}
                        className={
                          "menu-utility--type p-0 w-100 " +
                          (searchType === type.name ? "active" : "inactive")
                        }
                        key={type._id}
                        onClick={() => dispatch(updateSearchType(type.name))}
                      >
                        {type.name}
                      </Button>
                    </Col>
                  );
                })}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Card.Body>
    </Card>
  );
};

const MenuCombo = ({ searchCombo, comboType }) => {
  const dispatch = useDispatch();

  const groups = splitArrayIntoGroups(comboType.slice(0,3), 2);
  return (
    <Card>
      <Card.Title className="m-1">
        <span>Combos</span>
      </Card.Title>
      <Card.Body className="px-0 py-0">
        <Stack gap={1} direction="vertical">
          {groups.map((group, index) => (
            <Stack gap={2} direction="horizontal" key={index}>
              {group.map((type) => (
                <Button
                  variant={""}
                  className={
                    "menu-utility--combo--type p-0 w-50 " +
                    (searchCombo === type.name ? "active" : "inactive")
                  }
                  onClick={() => {
                    dispatch(updateSearchCombo(type.name));
                  }}
                  key={type._id}
                >
                  {type.name}
                </Button>
              ))}
            </Stack>
          ))}
        </Stack>
      </Card.Body>
    </Card>
  );
};

// const MenuPromotion = () => {
//   return (
//     <Card>
//       <Card.Title>
//         <h3>Combos</h3>
//       </Card.Title>
//       <Card.Body className="ps-0 py-0">
//         {comboType && (
//           <Stack gap={1} direction="vertical">
//             {comboType.map((type) => (
//               <Button
//                 variant={""}
//                 className={
//                   "menu-utility--combo--type px-3 mb-1 w-100 " +
//                   (menuSearchType === type.name ? "active" : "inactive")
//                 }
//                 onClick={() => {
//                   handleUpdateType(type.name);
//                 }}
//                 key={type._id}
//               >
//                 {type.name}
//               </Button>
//             ))}
//           </Stack>
//         )}
//       </Card.Body>
//     </Card>
//   );
// };

const MenuUtility = () => {
  const menu = useSelector(menuSelector);
  const { menuSearch, menuFood, menuView } = menu;
  return (
    <Container className="p-0 mb-4 menu-utility">
      <Row>
        <Col md={12} lg={5} className="">
          <MenuKeyword searchKeyword={menuSearch.keyword} />
        </Col>
        <Col xs={9} md={10} lg={5} className="">
          <MenuPrice priceRange={menuSearch.priceRange} />
        </Col>
        <Col xs={3} md={2} lg={2} className="">
          <MenuView view={menuView} />
        </Col>
      </Row>
      <Row>
        <Col xs={6} sm={6} md={6} lg={4} xl={4}>
          <MenuTag searchTags={menuSearch.tags} allTags={menuFood.tags} />
        </Col>
        <Col xs={6} sm={6} md={6} lg={4} xl={4}>
          <MenuType searchType={menuSearch.type} allTypes={menuFood.types} />
        </Col>
        <Col xs={6} sm={6} md={6} lg={4} xl={4}>
          <MenuCombo
            searchCombo={menuSearch.combo}
            comboType={menuFood.combo_types}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MenuUtility;
