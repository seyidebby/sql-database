const joi = require("joi");

const userEditSchema = joi.object({
  firstName: joi.string(),
  lastName: joi.number(),
});
function validateEditUser(req, res, next) {
  const { error, value } = userEditSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
}

module.exports = validateEditUser;
