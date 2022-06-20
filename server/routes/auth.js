require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../model/user");
const RefreshToken = require("../model/refreshToken");

const router = express.Router();

// register user
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.sendStatus(400);

  User.findOne({ username: username })
    .then((existedUser) => {
      if (existedUser) return res.sendStatus(400);
      return bcrypt.hash(password, 10);
    })
    .then((hashedPassword) => {
      const user = new User({
        username,
        hashedPassword,
      });
      return user.save();
    })
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("err:", err);
      res.sendStatus(500);
    });
});

// user login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.sendStatus(400);

  // find existed user
  User.findOne({ username: username })
    .then((existedUser) => {
      console.log(existedUser);
      if (!existedUser) return res.sendStatus(404);
      // compare passwords
      return bcrypt.compare(password, existedUser.hashedPassword);
    })
    .then((result) => {
      if (!result) return res.sendStatus(403);
      const user = { username: username };

      // generate access token and refresh token
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15s",
      });
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      const newRefreshToken = new RefreshToken({
        token: refreshToken,
      });

      //   return newRefreshToken.save();
      return new Promise((resolve, reject) => {
        newRefreshToken
          .save()
          .then(() => resolve({ accessToken, refreshToken }))
          .catch((err) => reject(err));
      });
    })
    .then(({ accessToken, refreshToken }) =>
      // send back tokens
      res.json({
        accessToken,
        refreshToken,
      })
    )
    .catch((err) => {
      console.log("err:", err);
      return res.sendStatus(500);
    });
});

// regenerate access token
router.post("/token", (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) return res.sendStatus(401);

  RefreshToken.findOne({ token: refreshToken })
    .then((token) => {
      if (!token) return res.sendStatus(403);
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          console.log("err:", err);
          if (err) return res.sendStatus(403);
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15s",
          });
          res.json({ accessToken });
        }
      );
    })
    .catch((err) => {
      console.log("err:", err);
      return res.sendStatus(500);
    });
});

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
