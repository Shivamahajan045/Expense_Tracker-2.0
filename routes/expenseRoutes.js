const express = require("express");
const router = express.Router();
const expenseController = require("../controller/expenseController");

router.get("/getAllExpense", expenseController.getAllExpense);

router.post("/addExpense", expenseController.addExpense);

router.delete("/delete/:id", expenseController.deleteExpense);

module.exports = router;
