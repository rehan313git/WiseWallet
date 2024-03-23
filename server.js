const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");

dotenv.config();

connectDB();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
// app.get("/", (req, res) => {
//   res.send("<h1> Rehan this side </h1>");
// });
app.use("/api/v1/users", require("./routes/userRoute"));

app.use("/api/v1/transactions", require("./routes/transactionRoutes"));

//port
const PORT = 8080 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
