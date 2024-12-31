// const express = require("express");
// const router = express.Router();

// const { signup, login } = require("../Controllers/AuthController");
// const {
//   signupValidation,
//   loginValidation,
// } = require("../Middlewares/AuthValidation");

// router.post("/login", loginValidation, login);
// router.post("/signup", signupValidation, signup);

// module.exports = router;

// routes/AuthRouter.js

const express = require("express");
const router = express.Router();
const { signup, login } = require("../Controllers/AuthController");
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/AuthValidation");
const UserRouter = require("./UserRouter"); // Import UserRouter

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);
router.use("/users", UserRouter);

module.exports = router;
