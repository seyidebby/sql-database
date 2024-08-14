const { User } = require("../models/index.js");
const bcrypt = require("bcryptjs");

async function getAllUsers(req, res) {
  try {
    const allUsers = await User.findAll();

    // console.log(allUsers.every((user) => user instanceof user)); // true
    // console.log("All users:", JSON.stringify(allUsers, null, 2));
    res.status(200).json({ message: "all account gotten", account: allUsers });
  } catch (error) {
    console.log(error);
  }
}
async function getUser(req, res) {
  try {
    const getById = await User.findOne({
      where: {
        id: req.params.id,
      },

      attributes: ["id", "firstName", "lastName", "email"],
    });
    if (getById) {
      res.status(200).json({ message: "account gotten", account: getById });
    }
    return res.status(400).json({ message: "user doesn't exist" });
  } catch (error) {
    console.log(error);
  }
}
async function editUser(req, res) {
  try {
    const userExist = await User.findOne({ where: { id: req.params.id } });
    if (userExist) {
      const edit = await userExist.update(req.body, {
        return: "after",
      });
      return res.status(200).json({
        message: "user updated",
        editted: {
          firstName: userExist.firstName,
          lastName: userExist.lastName,
          email: userExist.email,
        },
      });
    }
    return res.status(400).json({ message: "user does not exist" });
  } catch (error) {
    console.log(error);
  }
}
async function deleteUser(req, res) {
  try {
    const deleteUser = await User.destroy({ where: { id: req.params.id } });
    if (deleteUser) {
      res.status(207).json({ message: "account deleted" });
    }
    return res.status(400).json({ message: "user doesn't exist" });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getAllUsers, getUser, editUser, deleteUser };
