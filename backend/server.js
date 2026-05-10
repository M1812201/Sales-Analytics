const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const SalesSchema = new mongoose.Schema({
  store: String,
  sales: Number
});

const Sales = mongoose.model("Sales", SalesSchema);

// test route
app.get("/", (req, res) => {
  res.send("Backend working");
});

// get sales
app.get("/sales", async (req, res) => {
  const data = await Sales.find();
  res.json(data);
});

// add sales
app.post("/sales", async (req, res) => {
  const newData = new Sales(req.body);
  await newData.save();
  res.json(newData);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));