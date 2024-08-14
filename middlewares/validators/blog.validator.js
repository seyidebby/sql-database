const joi = require("joi");

const blogSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
});
function validateblog(req, res, next) {
  const { error, value } = blogSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
}

const blogeditSchema = joi.object({
  title: joi.string(),
  description: joi.string(),
});
function validateblogedit(req, res, next) {
  const { error, value } = blogeditSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
}
module.exports = {
  validateblog,
  validateblogedit,
};
