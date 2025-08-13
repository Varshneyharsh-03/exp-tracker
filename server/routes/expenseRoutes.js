const express = require("express");
const Expense = require("../models/Expense");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// ➕ Add Expense
router.post("/", authMiddleware, async (req, res) => {
  try {
    const expense = new Expense(req.body);
    const saved = await expense.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📜 Get All Expenses
router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🗑 Delete Expense
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update Expense
router.put("/:id", async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
