const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const jwtSecret="Guri Rocks!!"

//For Signup
router.post("/createuser",
  [
    body("email", "Email is not valid").isEmail(),
    body("name", "Name is not proper").isLength({ min: 5 }),
    body("password", "Password is not of minimum length").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSaltSync(10);
    const secpassword = await bcrypt.hashSync(req.body.password, salt);
    try {
      const userdata = await User.create({
        name: req.body.name,
        password: secpassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ userdata, success: true });
      await userdata.save();
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
);

//For Login
router.post( "/loginuser",
  [
    body("email", "Email is not valid").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res
          .status(400)
          .json({ errors: "Try to login with correct credentials" });
      }
      const pwdCompare=await bcrypt.compareSync(req.body.password,user.password)
      if (!pwdCompare) {
        res
          .status(400)
          .json({ errors: "Try to login with correct credentials" });
      }
      const data={
        user:{
          id:user.id
        }
      }
      const authToken=await jwt.sign(data,jwtSecret)
      return res.json({ user,success: true,authToken:authToken});
    } catch (error) {
      console.error(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
