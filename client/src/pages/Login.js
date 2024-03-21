import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    console.log(values);
    try {
      const { data } = await axios.post("/users/login", values);
      message.success("Login Successful");
      localStorage.setItem("user", JSON.stringify({ ...data, password: "" }));
      navigate("/");
    } catch (error) {
      message.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="register-page ">
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>LogIn Form</h1>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div>
            <button className="btn btn-primary">LogIn</button>
          </div>
          <div className="d-flex justify-content-between">
            First Time ?<Link to="/register"> Click here to Register</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
