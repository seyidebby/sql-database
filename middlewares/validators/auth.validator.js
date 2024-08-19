const joi = require("joi");

const signupSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(10).required(),
});

function validateSignup(req, res, next) {
  const { error, value } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
}
const signinSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});
function validatesignin(req, res, next) {
  const { error, value } = signinSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
}

const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});
function validatelogin(req, res, next) {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
}

module.exports = { validateSignup, validatesignin, validatelogin };
