const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Contact = require("../models/Contacts");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

//router   get api/contacts
//desc     get user contacts
//access   private

router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//router   post api/contacts
//desc     post user contacts
//access   private

router.post(
  "/",
  [auth, [check("name", "name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//router   put api/contacts
//desc     edit user contacts
//access   private

router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    //check contact exists
    if (!contact) {
      return res.status(404).json({ msg: "contact not found" });
    }
    //check if the user has the contacts
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields,
      },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
//router   delete api/contacts
//desc     delete user contacts
//access   private

router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    //check contact exists
    if (!contact) {
      return res.status(404).json({ msg: "contact not found" });
    }
    //check if the user has the contacts
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }
    contact = await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: "contact removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
module.exports = router;
