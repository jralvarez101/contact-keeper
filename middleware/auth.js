const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    //If there is a token then we verify it
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //Then we pull user out of the payload and set it to req.user
    req.user = decoded.user;
    next();
  } catch (err) {
    // we will send this message is the token is not verified
    res.status(401).json({ msg: "Token is not valid" });
  }
};
