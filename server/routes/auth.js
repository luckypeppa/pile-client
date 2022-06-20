require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

const refreshTokens = [];
const users = [];

// register user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.sendStatus(400);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({
      username,
      hashedPassword,
    });
    res.sendStatus(201);
  } catch {
    res.sendStatus(500);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.sendStatus(400);

  try {
    const existedUser = users.filter((user) => user.username === username)[0];
    if (!existedUser) return res.sendStatus(404);
    const result = await bcrypt.compare(password, existedUser.hashedPassword);
    if (!result) return res.sendStatus(403);
  } catch {
    return res.sendStatus(500);
  }

  const user = { username: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15s",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);

  res.json({
    accessToken,
    refreshToken,
  });
});

// regenerate access token
router.post("/token", (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log(refreshToken);

  if (!refreshToken) return res.sendStatus(401);

  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    console.log("err:", err);
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15s",
    });
    res.json({ accessToken });
  });
});

router.get("/post", (req, res) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader.split(" ")[1];
  if (!accessToken) return res.sendStatus(401);
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log("err:", err);
    if (err) return res.sendStatus(403);
    res.json({ msg: "got" });
  });
});

module.exports = router;
