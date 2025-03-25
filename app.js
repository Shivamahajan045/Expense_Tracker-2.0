const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const cors = require("cors");
const User = require("./models/user");
const sequelize = require("./utils/database");
const bcrypt = require("bcrypt");
const Expense = require("./models/expense");

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

//signup
app.post("/user/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if any field is missing
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name: username,
      email: email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created successfully!", user });
  } catch (error) {
    console.error("Signup error:", error.name);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(403).json({ message: "Email already in use!" });
    }
    res.status(500).json({ message: "User not created", error: error.message });
  }
});

app.post("/user/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All feilds are required!" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found! Please sign up." });
    }

    // Correct async/await bcrypt.compare usage
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(401).json({ message: "Incorrect password!" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User loggedin successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

//expense route
app.get("/expense", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "expense.html"));
});

//getAllExpense

app.get("/expense/getAllExpense", async (req, res) => {
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
});

app.post("/expense/addExpense", async (req, res) => {
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
});

app.delete("/expense/delete/:id", async (req, res) => {
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
});

sequelize
  .sync({ force: false })
  .then((result) => {
    // console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});
