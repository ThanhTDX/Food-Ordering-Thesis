import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import MenuPage from "./MenuPage";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Carousel,
  CarouselCaption,
  Image,
  Container,
  Button,
} from "react-bootstrap";
import { menuSelector } from "../slices/menuSlice";
import OpacityImage from "../components/OpacityImage";

import carousel1 from "./static/img/2f67bc30f37cf8cc1c49e8d51fba0e435555d844-1800x1000.jpg";
import carousel2 from "./static/img/photo-1517248135467-4c7edcad34c4.jpg";
import carousel3 from "./static/img/quan-lau-ngon-o-hue-1.jpg";
import building1 from "./static/img/thiet-ke-quan-cafe-lekao-coffee-dong-khoi-ben-tre-24.png";
import building2 from "./static/img/download.jpg";
import building3 from "./static/img/the-20-year-old-vietnam-pho-restaurant-in-south-korea-1022.jpg";
import customMenu from "./static/img/Screenshot 2024-11-01 141452.png";

import "./static/css/HomePage.css";
function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menu = useSelector(menuSelector);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   dispatch(menuList());
  // }, []);

  return loading ? (
    <Loader height={100} width={100}/>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Carousel fade data-bs-theme="dark" className="w-100 home--carousel">
        <Carousel.Item>
          <OpacityImage src={carousel1} alt="carousel1" opacity={0.2} />
          <Carousel.Caption>
            <h1>Thành's Deli</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <OpacityImage src={carousel2} alt="carousel2" opacity={0.2} />
          <Carousel.Caption>
            <h1>Thành's Deli</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <OpacityImage src={carousel3} alt="carousel3" opacity={0.2} />
          <Carousel.Caption>
            <h1>Thành's Deli</h1>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container className="p-0 my-5 home--location">
        <h1 className=" m-auto text-center w-50">FIND US HERE</h1>
        <Row>
          <Col lg={4} className="">
            <Row>
              <Col sm={12} md={6} lg={12}>
                <Image src={building1} alt="building1" />
              </Col>
              <Col sm={12} md={6} lg={12}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4147719170305!2d106.68951667574422!3d10.779510589369513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f30903b6ec5%3A0xb392f56e447dd53c!2zMjggVsO1IFbEg24gVOG6p24sIFBoxrDhu51uZyA2LCBRdeG6rW4gMywgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1730430491370!5m2!1svi!2s"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Location 1"
                ></iframe>
              </Col>
            </Row>
            <Button
              className="w-100 my-1"
              variant="light"
              onClick={() => navigate("/reservation")}
            >
              <span className="fw-bold">MAKE RESERVATION HERE</span>
            </Button>
          </Col>
          <Col lg={4} className="">
            <Row>
              <Col sm={12} md={6} lg={12}>
                <Image src={building2} alt="building2" />
              </Col>
              <Col sm={12} md={6} lg={12}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.668536499134!2d106.65544597574498!3d10.83665818931578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529a0c8e4535f%3A0xaf9fc7ceee7e2f30!2zNjkwIMSQLiBRdWFuZyBUcnVuZywgUGjGsOG7nW5nIDgsIEfDsiBW4bqlcCwgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1730430790946!5m2!1svi!2s"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Location 2"
                ></iframe>
              </Col>
            </Row>

            <Button
              className="w-100 my-1"
              variant="light"
              onClick={() => navigate("/reservation")}
            >
              <span className="fw-bold">MAKE RESERVATION HERE</span>
            </Button>
          </Col>
          <Col lg={4} className="">
            <Row>
              <Col sm={12} md={6} lg={12}>
                <Image src={building3} alt="building3" />
              </Col>
              <Col sm={12} md={6} lg={12}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.8965913301854!2d106.66374507574378!3d10.742452689404336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752e5736c91f33%3A0x19aa876b05f61ed7!2zOTk3IMSQLiBQaOG6oW0gVGjhur8gSGnhu4NuLCBQaMaw4budbmcgNSwgUXXhuq1uIDgsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1730430738792!5m2!1svi!2s"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Location 3"
                ></iframe>
              </Col>
            </Row>

            <Button
              className="w-100 my-1"
              variant="light"
              onClick={() => navigate("/reservation")}
            >
              <span className="fw-bold">MAKE RESERVATION HERE</span>
            </Button>
          </Col>
        </Row>
      </Container>
      <Container className="p-0 my-5 home--custom-menu">
        <Row>
          <Col
            md={12}
            lg={6}
            className="d-flex flex-column align-items-start justify-content-center"
          >
            <h1 className="fw-bold fs-1">CREATE YOUR OWN PERSONAL MENU!</h1>
            <Button onClick={() => navigate("/menu")}>
              <span className="fw-bold fs-4">GO TO MENU</span>
            </Button>
          </Col>
          <Col
            md={12}
            lg={6}
            className="d-flex align-items-center justify-content-center"
          >
            <Image src={customMenu} alt={customMenu} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
