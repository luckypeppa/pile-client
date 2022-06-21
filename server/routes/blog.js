const express = require("express");
const jwt = require("jsonwebtoken");
const { getAllBlogs, createBlog } = require("../controller/blog");

const router = express.Router();

router.get("/", authenticateToken, getAllBlogs);
router.post("/", authenticateToken, createBlog);

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader.split(" ")[1];
  if (!accessToken) return res.sendStatus(401);
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send("Access Token has expired.");
    req.user = user;
    next();
  });
}

module.exports = router;
