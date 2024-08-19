const { User } = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function newAccount(req, res) {
  try {
    const alreadyHaveAnAccount = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (alreadyHaveAnAccount) {
      // console.log("already have an account")
      return res
        .status(400)
        .json({ message: "you already have an account, login instead" });
    }
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = passwordHash;

    const createAccount = await User.create(req.body);
    // console.log(createAccount)
    res
      .status(201)
      .json({ message: "account created successfully", new: createAccount });
  } catch (error) {
    console.log(error);
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const alreadyHaveAnAccount = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!alreadyHaveAnAccount) {
      console.log("user does not exist");
      // return res
      //   .status(400)
      //   .json({ message: "user does not exist. create an account" });
    }
    const comparePassword = bcrypt.compareSync(
      req.body.password,
      alreadyHaveAnAccount.password
    );

    if (comparePassword) {
      const token = {
        _id: alreadyHaveAnAccount._id,
        email: alreadyHaveAnAccount.email,
        fullName: alreadyHaveAnAccount.fullName,
      };
      console.log("login successful");
      // return res.status(200).json({
      //   message: "login successful",
      //   account: token,
      // });
    }
    // return res.status(400).json({ message: "credentials incorrect" });
    console.log("credential incorrect");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  newAccount,
  login,
};
