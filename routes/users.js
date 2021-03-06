const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult, check } = require("express-validator");

// @route    POST     api/users
// @desc     Register a user
// @access   Public
router.post(
  "/",
  [
    // checking for errors
    check("name", "Please add name").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    // Set try catch to see if there are users with that info already in the system
    try {
      let user = await User.findOne({ email });

      // If user already exists it will display the following message
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      // If the user does not exist a new user will instantiate
      user = new User({
        name,
        email,
        password,
      });

      console.log(user);

      // next we must encrypt (hash) the password with bcryptjs
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //object to send in the token --- for jsonwebtoken setup

      const payload = {
        user: {
          id: user.id,
        },
      };

      // generate token
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
