const express = require("express");
const router = express.Router();

const character = require("./characters");

router.use("/character", character);

module.exports = router;