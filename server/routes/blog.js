const express = require("express");
const jwt = require("jsonwebtoken");
const {
  getAllBlogs,
  createBlog,
  saveImage,
  getBlog,
  updateBlog,
  deleteBlog,
  getBlogsByTag,
  getAllTags,
  searchBlogs,
} = require("../controller/blog");

const router = express.Router();

router.post("/image", authenticateToken, authenticateRole, saveImage);
router.get("/tag/:tag", getBlogsByTag);
router.get("/tag/", getAllTags);
router.get("/search/:input", searchBlogs);
router.get("/:id", getBlog);
router.post("/:id", authenticateToken, authenticateRole, updateBlog);
router.delete("/:id", authenticateToken, authenticateRole, deleteBlog);
router.get("/", getAllBlogs);
router.post("/", authenticateToken, authenticateRole, createBlog);

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

function authenticateRole(req, res, next) {
  const user = req.user;
  if (user.role === "admin") next();
  res.status(403).json({ message: "The action is forbidden." });
}

module.exports = router;
