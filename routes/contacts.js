const express = require("express");
const router = express.Router();
// Every protected route needs to use this middleware
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Contact = require("../models/Contact");

// @route    GET     api/contacts
// @desc     Get all users contacts
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(err.messga);
  }
});

// @route    POST     api/contacts
// @desc     Add new contact
// @access   Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Pull out data from body
    const { name, email, phone, type } = req.body;

    try {
      // Create new contact
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      // Create variable of contact
      const contact = await newContact.save();

      // return contact to client
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(400).send("Server Error");
    }
  }
);

// @route    PUT    api/contacts/:id      <------ PUT(update) requires to show which contact to update
// @desc     Update contact
// @access   Private
router.put("/:id", auth, async (req, res) => {
  // Pull out data from body
  const { name, email, phone, type } = req.body;

  //Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    // we are matching the '/:id' with req.params.id
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    //Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Now we do the actual update
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    // Send back updated contact
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Server Error");
  }
});

// @route    DELETE    api/contacts/:id    <------ DELETE requires to show which contact to delete
// @desc     Delete contact
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // we are matching the '/:id' with req.params.id
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    //Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Remove the contact
    await Contact.findByIdAndRemove(req.params.id);

    // Send back updated contact
    res.json({ msg: "Contact Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Server Error");
  }
});

module.exports = router;
