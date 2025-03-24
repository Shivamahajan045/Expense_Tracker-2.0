const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const cors = require("cors");
const User = require("./models/user");
const sequelize = require("./utils/database");

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

//signup
app.post("/user/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Check if any field is missing
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.create({
      name: username,
      email: email,
      password: password,
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

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});
