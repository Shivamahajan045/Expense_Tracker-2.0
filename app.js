const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const cors = require("cors");
const sequelize = require("./utils/database");

const userRouter = require("./routes/userRoutes");
const expenseRouter = require("./routes/expenseRoutes");

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

//Root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

//signup and login
app.use("/user", userRouter);

//expense route
app.get("/expense", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "expense.html"));
});

app.use("/expense", expenseRouter);

sequelize
  .sync({ force: false })
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});
