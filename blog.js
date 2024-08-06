import express from "express";
import signup from "./signup.model.js";
import {
  newAccount,
  getAllAccount,
  getAccount,
  editAccount,
  deleteAccount,
} from "./signup.controller.js";
import {
  validateEditAccount,
  validateSignup,
} from "./middlewares/validators/signup.validator.js";
const server = express();
server.use(express.json());
port = 3000;

server.post("/signup", validateSignup, newAccount);
server.get("/signup", getAllAccount);
server.get("/signup/:id", getAccount);
server.patch("/signup/:id", validateEditAccount, editAccount);
server.delete("/signup/:id", deleteAccount);

server.listen(port, () => {
  console.log("sql server established");
});
