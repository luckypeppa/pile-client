const express = require("express");

const router = express.Router();

const { createComment } = require("../controller/comment");

const { authenticateToken } = require("./authUtils");

router.post("/", authenticateToken, createComment);

module.exports = router;
