const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();

//registration
userRouter.post("/register", async (req, res) => {
  const { email, pass, location, age } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      const user = new UserModel({ email, pass: hash, location, age });
      await user.save();
      res.status(200).send({ message: "Registration has been done" });
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//login
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(pass, hash, (err, result) => {
        if (result) {
          res.status(200).send({
            message: "Login Successful",
            token: jwt.sign({ userId: user._id }, "masai"),
          });
        } else {
          res.status(400).send({ message: "Wrong Creditionals" });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = userRouter;
