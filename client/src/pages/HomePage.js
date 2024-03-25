import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { Form, Input, Modal, Select, message, Table, DatePicker } from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import moment from "moment";
const { RangePicker } = DatePicker;
const HomePage = () => {
  const [showModal, setShowModal] = useState(false);

  const [allTransactions, setAllTransactions] = useState([]);
  const [freq, setFreq] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
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
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.post("/transactions//getall-transaction", {
          userid: user._id,
          freq,
          selectedDate,
        });
        setAllTransactions(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error("Could Not Fetch");
      }
    };
    getAllTransactions();
  }, [freq, selectedDate]);

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
        <div>
          <h6>Frequency</h6>
          <Select value={freq} onChange={(values) => setFreq(values)}>
            <Select.Option value="10000">Default</Select.Option>
            <Select.Option value="7">Previous Week</Select.Option>
            <Select.Option value="30">Previous Month</Select.Option>
            <Select.Option value="365">Previous Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {freq === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>
        <div className="btn btn-primary " onClick={() => setShowModal(true)}>
          Add New
        </div>
      </div>
      <div className="content">
        <Table columns={columns} dataSource={allTransactions} />
      </div>
      <Modal
        title="Enter Transaction"
        open={showModal}
        // onFinish={" "}
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
