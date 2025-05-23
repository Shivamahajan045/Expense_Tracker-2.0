const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const cors = require("cors");
const sequelize = require("./utils/database");

const User = require("./models/user");
const Expense = require("./models/expense");

const userRouter = require("./routes/userRoutes");
const expenseRouter = require("./routes/expenseRoutes");

app.use(express.json());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.static(path.join(__dirname, "views")));

//Root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

//login route
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

//expense route
app.get("/expense", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "expense.html"));
});

//  relationships
User.hasMany(Expense, { foreignKey: "userId", onDelete: "CASCADE" });
Expense.belongsTo(User, { foreignKey: "userId" });

//// API Routes
app.use("/user", userRouter);
app.use("/expense", expenseRouter);

// Database Connection
sequelize
  .sync({ force: false })
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});
