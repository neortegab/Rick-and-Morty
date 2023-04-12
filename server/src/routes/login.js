const express = require("express");
const route = express.Router();
const {login} = require("../controllers/login");

route.get("/", login);

module.exports = route;