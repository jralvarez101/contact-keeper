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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Take email and password out of the body
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
    } catch (error) {}
  }
);

// @route    POST    api/auth
// @desc     Auth user & get token
// @access   Public
router.post("/", (req, res) => {
  res.send("Log in user");
});

module.exports = router;
