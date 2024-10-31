import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { userSelector } from "../slices/userSlice";
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/login/RegisterForm";
import ChangePasswordForm from "../components/login/ChangePasswordForm";
import LoginStaffForm from "../components/login/LoginStaffForm";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState("login");
  const userLogin = useSelector(userSelector);
  const { error, loading, user } = userLogin;

  // useEffect(() => {
  //   if (user) {
  //     navigate("/users/profile");
  //   }
  // }, [user, navigate]);

  return (
    <Container
      fluid
      className="w-50 align-items-center border border-grey rounded-3 p-1"
    >
      <Image
        src="https://cdn.sanity.io/images/fr9flhkd/main/2f67bc30f37cf8cc1c49e8d51fba0e435555d844-1800x1000.jpg?fm=webp&q=75&w=1280" // Replace with your image URL
        alt="Table Image"
        rounded // Optional: adds rounded corners
        fluid // Optional: makes the image responsive
        className="w-100 mb-2"
      />
      {form === "login" && <LoginForm setForm={setForm} />}
      {form === "register" && <RegisterForm setForm={setForm} />}
      {form === "changePassword" && <ChangePasswordForm setForm={setForm} />}
      {form === "loginStaff" && <LoginStaffForm setForm={setForm} />}
    </Container>
  );
}

export default LoginPage;
