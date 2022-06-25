const express = require("express");

const router = express.Router();

const {
  createComment,
  getAllCommentsByBlogId,
} = require("../controller/comment");

const { authenticateToken } = require("./authUtils");

router.post("/", authenticateToken, createComment);
router.get("/:blogId", getAllCommentsByBlogId);

module.exports = router;
