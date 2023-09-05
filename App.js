const express = require("express");
const mongoose = require("mongoose");
const PORT = 3000;
const myRouter = require("./Routes/routes.js");
const app = express();
mongoose
.connect("mongodb://127.0.0.1:27017/Blogg")
.then(() => console.log("DB is connected"))
.catch(() => console.log("there is an erro"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", myRouter);

const myMiddleware = (req, res, next) => {
  console.log("Middleware function called");
  next();
};
app.use(myMiddleware);

app.get("/posts", (req, res) => {
  res.send("hello i am running");
});
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
