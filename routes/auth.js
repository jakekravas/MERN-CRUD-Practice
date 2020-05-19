const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');

// @route    GET post/auth
// @desc     Login user
// @access   Private
router.post("/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user){
        res.status(400).json({ msg: "Invalid credentials" });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch){
        res.status(400).json({ msg: "Invalid credentials" });
      }

      const payload = {user: {id: user._id}}

      jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: "59s"
      }, (err, token) => {
        if (err) throw err;
        res.json({token});
      })
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
)

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;