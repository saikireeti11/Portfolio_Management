const express = require("express");

const router = express.Router();

const {
  register,
  login,
  profile
} = require("../controllers/Auth.controller");

const { protect } = require("../middleware/Auth");
const { validate } = require("../middleware/Errorhandler");
const { registerValidator, loginValidator } = require("../validators/Auth.validators");

router.post("/register", registerValidator, validate, register);

router.post("/login", loginValidator, validate, login);

router.get("/profile", protect, profile);

module.exports = router;
