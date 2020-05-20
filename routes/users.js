const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// @route   POST /api/users
// @desc    Register a user
// @access  PRIVATE
router.post("/", 
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Valid email is required").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      res.status(400).json({ errors: errors.array() });
    }
    
    const { name, email, password } = req.body;
    
    try {
      let user = await User.findOne({ email });
      
      if (user){
        res.status(400).json({ msg: "Email already in use" });
      }

      const newUser = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      const hash = await bcrypt.hash(password, salt);

      newUser.password = hash;

      await newUser.save();

      const payload = {user: {id: newUser._id}};

      jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: "1h"
      }, (err, token) => {
        if (err) throw err;
        res.json({token});
      });

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

module.exports = router;