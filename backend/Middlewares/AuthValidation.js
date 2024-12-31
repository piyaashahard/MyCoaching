const Joi = require("joi");
const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.base": "Name must be a valid string.",
      "string.empty": "Name is required.",
      "string.min": "Name must be at least 3 characters long.",
      "string.max": "Name cannot exceed 100 characters.",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format.",
      "any.required": "Email is required.",
    }),
    password: Joi.string().min(4).max(100).required().messages({
      "string.base": "Password must be a valid string.",
      "string.min": "Password must be at least 4 characters long.",
      "string.max": "Password cannot exceed 100 characters.",
      "any.required": "Password is required.",
    }),
    school: Joi.string().required().messages({
      "string.base": "School must be a valid string.",
      "string.empty": "School is required.",
    }),
    cls: Joi.number().integer().min(1).max(13).required().messages({
      "number.base": "Class (cls) must be a valid number.",
      "number.min": "Class must be at least 1.",
      "number.max": "Class cannot exceed 13.",
      "any.required": "Class is required.",
    }),
    batch: Joi.string().min(1).max(100).required().messages({
      "string.base": "Batch must be a valid string.",
      "string.min": "Batch must be at least 1 character long.",
      "string.max": "Batch cannot exceed 100 characters.",
      "any.required": "Batch is required.",
    }),
    uniqueId: Joi.number().integer().required().messages({
      "number.base": "Unique ID must be a valid number.",
      "any.required": "Unique ID is required.",
    }),
    roll: Joi.number().min(1).max(100).required().messages({
      "string.min": "Roll must be at least 1 character long.",
      "string.max": "Roll cannot exceed 100 characters.",
      "any.required": "Roll is required.",
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorDetails = error.details.map((err) => err.message);
    return res.status(400).json({
      message: "Signup validation failed.",
      errors: errorDetails,
    });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format.",
      "any.required": "Email is required.",
    }),
    password: Joi.string().min(4).max(100).required().messages({
      "string.base": "Password must be a valid string.",
      "string.min": "Password must be at least 4 characters long.",
      "string.max": "Password cannot exceed 100 characters.",
      "any.required": "Password is required.",
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorDetails = error.details.map((err) => err.message);
    return res.status(400).json({
      message: "Login validation failed.",
      errors: errorDetails,
    });
  }

  next();
};

module.exports = {
  signupValidation,
  loginValidation,
};
