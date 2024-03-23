import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { Form, Input, Modal, Select } from "antd";
import FormItem from "antd/es/form/FormItem";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <Layout>
      {/* <h1>HomePage</h1> */}
      <div className="filters">
        <div>range filters</div>
        <div className="btn btn-primary " onClick={() => setShowModal(true)}>
          Add New
        </div>
      </div>
      <div className="content"></div>
      <Modal
        title="Enter Transaction"
        open={showModal}
        onCancel={() => setShowModal(false)}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <FormItem label="Amount" name="amount">
            <Input type="text" />
          </FormItem>
          <FormItem label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expenditure">Expenditure</Select.Option>
            </Select>
          </FormItem>
          <FormItem label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="bonus">Bonus</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
              <Select.Option value="fees">Fees</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="shopping">Shopping</Select.Option>
            </Select>
          </FormItem>
          <FormItem label="Date" name="date">
            <Input type="date" />
          </FormItem>
          <FormItem label="Reference" name="reference">
            <Input type="text" />
          </FormItem>
          <FormItem label="Description" name="description">
            <Input type="text" />
          </FormItem>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              {" "}
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
