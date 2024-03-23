const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: [true],
    },
    amount: {
      type: Number,
      required: [true, "Enter amount of the transaction"],
    },
    type: {
      type: String,
      required: [true, "Enter type"],
    },
    category: {
      type: String,
      required: [true, "Which category does your transaction fall under"],
    },
    description: {
      type: String,
      required: [true, "Describe your transaction"],
    },
    date: {
      type: Date,
      required: [true, "Date of transaction is required !"],
    },
  },
  {
    timestamps: true,
  }
);

const transactionModel = mongoose.model("transactions", transactionSchema);
module.exports = transactionModel;
