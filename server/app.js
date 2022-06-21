const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const blogRouter = require("./routes/blog");
const authRouter = require("./routes/auth");
const app = express();

const dbUrl =
  "mongodb+srv://test:test123456@node-learn.hu0hto2.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to database.");
    app.listen(3000);
  })
  .catch((err) => console.log(err));

app.use(morgan("dev"));
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use("/blogs", blogRouter);
app.use("/auth", authRouter);
