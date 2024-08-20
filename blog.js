const express = require("express");
const db = require("./models/index.js");
const dotenv = require("dotenv");
const Sequelize = require("sequelize");
const { newAccount, login } = require("./controllers/auth.controller.js");
const {
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
dotenv.config();
const port = process.env.PORT;

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

let sequelize;
if (process.env.NODE_ENV === "development") {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
    }
  );
} else {
  sequelize = new Sequelize(
    "postgresql://sqldatabase_zhbu_user:repA5wBxDVGjsXWJj4wQYt2crbrXI1J3@dpg-cr1k1po8fa8c73a9ohpg-a.oregon-postgres.render.com/sqldatabase_zhbu",
    { dialect: "postgres" }
  );
}

server.all("*", (req, res) => {
  res.status(400).send("route does not exist");
});
server.listen(port, async () => {
  console.log("sql server established");
  try {
    await sequelize.authenticate().then(() => {
      console.log("Connection has been established successfully.");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
