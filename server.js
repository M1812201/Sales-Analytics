const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ==========================
// MongoDB Connection
// ==========================
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected ☁️");
})
.catch((err) => {
    console.log("MongoDB Connection Error:", err);
});

// ==========================
// Schema & Model
// ==========================
const salesSchema = new mongoose.Schema({
    store: {
        type: String,
        required: true
    },
    sales: {
        type: Number,
        required: true
    }
});

const Sales = mongoose.model("Sales", salesSchema);

// ==========================
// Routes
// ==========================

// Test route
app.get("/", (req, res) => {
    res.send("Backend API Running 🚀");
});

// GET all sales data
app.get("/sales", async (req, res) => {
    try {
        const data = await Sales.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new sales data (for ML output / dashboard input)
app.post("/sales", async (req, res) => {
    try {
        const newSale = new Sales(req.body);
        await newSale.save();
        res.json({
            message: "Data added successfully ✅",
            data: newSale
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================
// Start Server
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `);
});