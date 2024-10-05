import React from 'react'

import MenuItem from "../components/MenuItem";

import { Row , Col } from 'react-bootstrap'

function MenuList({
  menuItems,
  menuView,
  menuSearchKeyWord,
  menuSearchTags,
  menuSearchType,
}) {
  return (
    <Row>
      {menuItems.map((item) => {
        return (
          <Col sm={12} md={6} lg={4}>
            <MenuItem key={item._id} item={item} exact />
          </Col>
        );
      })}
    </Row>
  );
}

export default MenuList