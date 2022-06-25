const express = require("express");

const router = express.Router();

const {
  createComment,
  getAllCommentsByBlogId,
  deleteComment,
} = require("../controller/comment");

const { authenticateToken } = require("./authUtils");

router.post("/", authenticateToken, createComment);
router.get("/:blogId", getAllCommentsByBlogId);
router.delete("/:commentId", deleteComment);

module.exports = router;
