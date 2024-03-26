import { Progress } from "antd";
import React from "react";

const Charts = ({ allTransactions }) => {
  const categories = [
    "salary",
    "bonus",
    "bills",
    "tax",
    "fees",
    "food",
    "shopping",
  ];
  //transactions
  const totalTransactions = allTransactions.length;
  const totalIncome = allTransactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenditure = allTransactions.filter(
    (transaction) => transaction.type === "expenditure"
  );

  const totalIncomePercentage = (totalIncome.length / totalTransactions) * 100;
  const totalExpenditurePercentage =
    (totalExpenditure.length / totalTransactions) * 100;

  // turnover

  const totalTurnover = allTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenditureTurnover = allTransactions
    .filter((transaction) => transaction.type === "expenditure")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercentage =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenditureTurnoverPercentage =
    (totalExpenditureTurnover / totalTurnover) * 100;

  return (
    <>
      <div className="row m-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Transactions : {totalTransactions}
            </div>
            <div className="card-body padding: 10px">
              <h5 className="text-success">Income : {totalIncome.length}</h5>{" "}
              <h5 className="text-danger">
                Expenditure : {totalExpenditure.length}
              </h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercentage}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpenditurePercentage}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total Turnover : {totalTurnover}</div>
            <div className="card-body padding: 10px">
              <h5 className="text-success">Income : {totalIncomeTurnover}</h5>{" "}
              <h5 className="text-danger">
                Expenditure : {totalExpenditureTurnover}
              </h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomeTurnoverPercentage.toFixed(2)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpenditureTurnoverPercentage.toFixed(2)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-4">
          <h4>Category-Wise Income</h4>
          {categories.map((category) => {
            const amount = allTransactions
              .filter(
                (transaction) =>
                  transaction.type === "income" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        2
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="col-md-4">
          <h4>Category-Wise Expenditure</h4>
          {categories.map((category) => {
            const amount = allTransactions
              .filter(
                (transaction) =>
                  transaction.type === "expenditure" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={(
                        (amount / totalExpenditureTurnover) *
                        100
                      ).toFixed(2)}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Charts;
