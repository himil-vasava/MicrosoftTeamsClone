const express = require("express");

const auth = require("../controllers/user.js");

const signin = auth.signin;
const signup = auth.signup;

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

module.exports = router;
