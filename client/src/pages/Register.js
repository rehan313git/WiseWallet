import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    console.log(values);
    try {
      await axios.post("/users/register", values);
      message.success("Registration Successful");
      navigate("/login");
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="register-page ">
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Register Form</h1>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>
          <div>
            <button className="btn btn-primary">Register</button>
          </div>
          <div className="d-flex justify-content-between">
            Already Registered ?<Link to="/login"> Click here to LogIn</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
