const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.json());
app.use(express.static("public"));

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

//signup
app.post("/user/signup", (req, res) => {
  res.send("signup working");
});


app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});
