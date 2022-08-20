const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwt_token = "kartik";
const fetchuser = require("../middleware/fetchuser");


// create a user using :Post "api/auth/createuser" no login required
router.post(
  "/createuser",
  [
    body("email", "enter a valid email").isEmail(),
    body("name", "should be atleast 3 characters long").isLength({ min: 3 }),
    body("password", "should be atleast 8 characters long").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry a user with this email aready exist" });
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign( data, jwt_token );
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

// authenticate a user using :post "api/auth/login" .no login required
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "passowrd cant be empty").exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }
      const passwordCompare = password === user.password;
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, jwt_token);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// get logged in User's details using post :/api/auth/getuser , login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});
module.exports = router;
