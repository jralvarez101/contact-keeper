const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult, check } = require("express-validator");

// @route    GET     api/auth
// @desc     Get logged in user
// @access   Private
router.get(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  (req, res) => {
    res.send("Get logged in user");
  }
);

// @route    POST    api/auth
// @desc     Auth user & get token
// @access   Public
router.post("/", (req, res) => {
  res.send("Log in user");
});

module.exports = router;
