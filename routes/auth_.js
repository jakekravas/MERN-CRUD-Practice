const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
  // try {
  //   jwt.verify(req.token, config.get("jwtSecret"), async (err, data) => {
  //     if (err){
  //       res.sendStatus(403);
  //     } else {
  //       const user = await User.findById(data.user._id).select("-password");
  //       res.json({ user });
  //     }
  //   })
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send("Server error");
  // }
})

// LOGIN
router.post("/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is reqiured").not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      res.status(400).json({ msg: "Invalid credentials" });
    }
    
    const {email, password} = req.body;
    
    try {
      let user = await User.findOne({email});
      if (!user){
        res.status(400).json({ msg: "Invalid credentials" });
      }
      
      let isMatch = bcrypt.compare(password, user.password);
      if (!isMatch){
        res.status(400).json({ msg: "Invalid credentials" });
      }

      // const userToLoad = {user: {id: user._id}};

      // jwt.sign(userToLoad, config.get("jwtSecret"), {
      jwt.sign({user}, config.get("jwtSecret"), {
        expiresIn: "59s"
      }, (err, token) => {
        if (err) throw err;
        res.json({token});
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
})

module.exports = router;