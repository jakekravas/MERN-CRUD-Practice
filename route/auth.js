const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    POST api/auth
// @desc     Checking login credentials
// @access   Private
router.post("/", 
  [
    check("email", "Please use a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user){
        res.status(400).json({ msg: "Invalid credentials" })
      }
      
      const isMatch = bcrypt.compare(password, user.password);
      
      if (!isMatch){
        res.status(400).json({ msg: "Invalid credentials" })
      }

      const payload = {
        user: {
          id: user._id
        }
      }

      jwt.sign(payload, config.get("jwtSecret"), { 
        expiresIn: 3600 //number of seconds it expires in. this expires after an hour
       }, (err, token) => {
         if (err) throw err;
         res.json({ token });
       });

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

module.exports = router;