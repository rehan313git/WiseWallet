import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { Form, Input, Modal, Select, message, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [AllTransactions, setAllTransactions] = useState([]);
  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post("/transactions//getall-transaction", {
        userid: user._id,
      });
      setAllTransactions(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      message.error("Could Not Fetch");
    }
  };
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Your Desciption",
      dataIndex: "description",
    },
    {
      title: "Actions",
    },
  ];
  useEffect(() => {
    getAllTransactions();
  }, []);

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.post("/transactions/add-transaction", {
        ...values,
        userid: user._id,
      });
      message.success("Transaction Added Successfully");
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
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
      <div className="content">
        <Table columns={columns} dataSource={AllTransactions} />
      </div>
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
            <Input type="Date" />
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
