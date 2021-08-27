const express = require("express");
const router = express.Router();

//router  post api/auth
//desc     get user logged in
//access   private

router.get("/", (req, res) => {
  res.send("get user logged in");
});

//router  post api/auth
//desc    log in user and get token
//access   private

router.post("/", (req, res) => {
  res.send("login user");
});

module.exports = router;
