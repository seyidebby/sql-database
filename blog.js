const express = require("express");
const db = require("./models/index.js");
const { newAccount, login } = require("./controllers/auth.controller.js");
const {
  validateEditAccount,
  validateSignup,
  validatelogin,
} = require("./middlewares/validators/auth.validator.js");
const {
  getAllUsers,
  getUser,
  editUser,
  deleteUser,
} = require("./controllers/user.controller.js");
const {
  newBlog,
  getAllBlogs,
  getBlog,
  editBlog,
  deleteBlog,
} = require("./controllers/blog.controllers.js");
const {
  validateblog,
  validateblogedit,
} = require("./middlewares/validators/blog.validator.js");
const validateEditUser = require("./middlewares/validators/user.validator.js");
const server = express();
server.use(express.json());
port = process.env.PORT;

server.post("/signup", validateSignup, newAccount);
server.post("/login", validatelogin, login);
server.get("/user", getAllUsers);
server.get("/user/:id", getUser);
server.patch("/user/:id", validateEditUser, editUser);
server.delete("/user/:id", deleteUser);

server.post("/blog", validateblog, newBlog);
server.get("/blog", getAllBlogs);
server.get("/blog/:id", getBlog);
server.patch("/blog/:id", validateblogedit, editBlog);
server.delete("/blog/:id", deleteBlog);

server.listen(port, async () => {
  console.log("sql server established");
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
