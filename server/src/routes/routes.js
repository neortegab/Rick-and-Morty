const express = require("express");
const router = express.Router();

const character = require("./characters");
const login = require("./login");
const favorite = require("./favorites");

router.use("/character", character);
router.use("/login", login);
router.use("/favorite", favorite);

module.exports = router;