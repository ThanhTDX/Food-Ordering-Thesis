import React from 'react'
import { Container, Button, Stack} from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { customMenuSelector, updateMenuItem } from '../slices/customMenuSlice'
import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp , faArrowDown , faTrashCan } from '@fortawesome/free-solid-svg-icons'
import MenuItem from './MenuItem';

const CustomMenu = () => {
  const dispatch = useDispatch();
  const customMenu = useSelector(customMenuSelector)
  const navigate = useNavigate()
  const { menuItems } = customMenu

  const handleIncrement = (item) => {
    dispatch(updateMenuItem({ menuItem: item, qty: item.qty + 1 }));
  }

  const handleDecrement = (item) => {
    dispatch(updateMenuItem({ menuItem: item, qty: item.qty - 1 }));
  };

  const handleDelete = (item) => {
    dispatch(updateMenuItem(item, 0));
  };
  
  return (
    <Container className="custom-menu--wrapper">
      <h2>Your Personal Menu</h2>
      <Container className="custom-menu">
        <Stack gap={3} className="">
          {menuItems.map((item) => {
            return (
              <div className="custom-menu__item--wrapper" key={item._id}>
                <img src={item.image} alt={item.image} />
                <p>{item.name}</p>
                <div>
                  {item.qty}
                  <Button onClick={() => handleDecrement(item)}>
                    <FontAwesomeIcon icon={faArrowDown} />
                  </Button>
                  <Button onClick={() => handleIncrement(item)}>
                    <FontAwesomeIcon icon={faArrowUp} />
                  </Button>
                  <Button onClick={() => handleDelete(item)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </Button>
                </div>
              </div>
            );
          })}
          {/* <div>
            {menuItems.reduce((item, currentPrice) => Number(item.price) + currentPrice, 0)}
          </div> */}

          <Button variant="success" onClick={() => navigate("/checkout")}>
            CHECKOUT
          </Button>
        </Stack>
      </Container>
    </Container>
  );
}

export default CustomMenu;