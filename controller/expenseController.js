const Expense = require("../models/expense");

const getAllExpense = async (req, res) => {
  try {
    let response = await Expense.findAll();
    if (!response) {
      return res.status(400).json({ message: "No expense found" });
    }
    return res
      .status(200)
      .json({ message: "Expense Fetched successfully", response });
    // console.log(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", err: error.message });
  }
};

const addExpense = async (req, res) => {
  try {
    let { amount, description, category } = req.body;
    let newExpense = await Expense.create({
      amount: amount,
      description: description,
      category: category,
    });
    // console.log(newExpense);
    return res
      .status(200)
      .json({ message: "Expense added Successfully", newExpense });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", err: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    let expenseId = req.params.id;
    if (!expenseId) {
      return res
        .status(404)
        .json({ message: "ExpenseId not found", expenseId });
    }

    Expense.destroy({
      where: {
        id: expenseId,
      },
    });
    return res
      .status(200)
      .json({ message: "Expense Deleted successfully", expenseId });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong!", err: err.message });
  }
};

module.exports = {
  getAllExpense,
  addExpense,
  deleteExpense,
};
