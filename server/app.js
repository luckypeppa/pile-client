const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const blogRouter = require("./routes/blog");
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
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/blogs", blogRouter);
