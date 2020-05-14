const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

const Note = require('../models/Note');

// @route    GET api/notes
// @desc     Get all user notes
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({user: req.user._id});
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/",
  [auth,
    check("title", "Title is required").not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      res.status(400).json({ errors: errors.array() })
    }

    const {title, content} = req.body;
    try {
      const newNote = Note({
        title,
        content,
        user: req.user._id
      });

      const savedNote = await newNote.save();
      res.json(savedNote);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

module.exports = router;