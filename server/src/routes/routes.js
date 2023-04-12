const express = require("express");
const router = express.Router();

const character = require("./characters");
const login = require("./login")

router.use("/character", character);
router.use("/login", login);

module.exports = router;