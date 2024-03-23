const express = require("express");
const {
  addTransaction,
  getAllTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

// routes
router.post("/add-transaction", addTransaction);
router.post("/getall-transaction", getAllTransaction);

module.exports = router;
