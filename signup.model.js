import mongoose from "mongoose";
const signupschema = mongoose.Schema({
  fullName: { type: String, require: true },
  phoneNumber: { type: Number, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});
const signup = mongoose.model("signup", signupschema);

export default signup;
