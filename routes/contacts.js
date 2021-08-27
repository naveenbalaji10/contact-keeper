const express = require("express");
const router = express.Router();

//router   get api/contacts
//desc     get user contacts
//access   private

router.get("/", (req, res) => {
  res.send("get user contacts");
});

//router   post api/contacts
//desc     post user contacts
//access   private

router.post("/", (req, res) => {
  res.send("post user contacts");
});

//router   put api/contacts
//desc     edit user contacts
//access   private

router.put("/:id", (req, res) => {
  res.send("edit user contacts");
});
//router   delete api/contacts
//desc     delete user contacts
//access   private

router.delete("/:id", (req, res) => {
  res.send("delete user contacts");
});
module.exports = router;
