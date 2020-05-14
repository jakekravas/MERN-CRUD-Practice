const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

const Note = require('../models/Note');
const User = require('../models/User');

// @route    GET api/notes
// @desc     Get all user notes
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ date: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    POST api/notes
// @desc     Add note
// @access   Private
router.post("/",
  [
    auth,
    [check("name", "Name is required").not().isEmpty()]
  ],
  (req, res) => {
  
});

module.exports = router;