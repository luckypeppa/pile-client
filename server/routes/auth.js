require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../model/user");
const RefreshToken = require("../model/refreshToken");

const router = express.Router();

// register user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.sendStatus(400);

  const existedUser = await User.findOne({ username: username });
  // if username already existed return
  if (existedUser) return res.sendStatus(400);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      hashedPassword,
    });
    await newUser.save();
    const user = { username, email };

    // generate access token and refresh token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const newRefreshToken = new RefreshToken({
      token: refreshToken,
    });

    //   return newRefreshToken.save();
    await newRefreshToken.save();

    // send back tokens
    res.status(201).json({
      ...user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.log("err:", err);
    res.sendStatus(500);
  }
});

// user login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.sendStatus(400);

  // find existed user
  const existedUser = await User.findOne({ username: username });
  if (!existedUser) return res.sendStatus(404);

  try {
    // compare passwords
    const result = await bcrypt.compare(password, existedUser.hashedPassword);
    if (!result) return res.sendStatus(403);
    const user = { username: username, email: existedUser.email };

    // generate access token and refresh token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const newRefreshToken = new RefreshToken({
      token: refreshToken,
    });

    //   return newRefreshToken.save();
    await newRefreshToken.save();

    // send back tokens
    res.json({
      ...user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.log("err:", err);
    return res.sendStatus(500);
  }
});

// regenerate access token
router.post("/token", (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) return res.sendStatus(400);

  RefreshToken.findOne({ token: refreshToken })
    .then((token) => {
      if (!token) return res.sendStatus(401);
      if (Date.now() - new Date(token.createdAt) > 30000) {
        return res.sendStatus(401);
      }
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          console.log("err:", err);
          if (err) return res.sendStatus(403);
          const accessToken = generateRefreshToken(user);
          res.json({ accessToken });
        }
      );
    })
    .catch((err) => {
      console.log("err:", err);
      return res.sendStatus(500);
    });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15s",
  });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

// router.get("/post", (req, res) => {
//   const authHeader = req.headers["authorization"];
//   const accessToken = authHeader.split(" ")[1];
//   if (!accessToken) return res.sendStatus(401);
//   jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     console.log("err:", err);
//     if (err) return res.sendStatus(403);
//     res.json({ msg: "got" });
//   });
// });

module.exports = router;
