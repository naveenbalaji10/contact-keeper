const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = (req, res, next) => {
  //get token from header
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "unauthorized token" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
};
