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
    const notes = await Note.find({user: req.user.id});
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    POST api/notes
// @desc     Add a new note
// @access   Private
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
        user: req.user.id
      });

      const savedNote = await newNote.save();
      res.json(savedNote);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

// @route    DELETE api/notes
// @desc     Delete a note
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ msg: "Note not found" });
    
    if (note.user.toString() !== req.user.id){
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Note.findByIdAndRemove(req.params.id);

    res.json({ msg: "Note deleted" })
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

module.exports = router;