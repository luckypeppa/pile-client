const express = require("express");
const jwt = require("jsonwebtoken");
const {
  getAllBlogs,
  createBlog,
  saveImage,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog");

const router = express.Router();

router.post("/image", authenticateToken, saveImage);
router.get("/:id", getBlog);
router.post("/:id", authenticateToken, updateBlog);
router.delete("/:id", authenticateToken, deleteBlog);
router.get("/", getAllBlogs);
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
