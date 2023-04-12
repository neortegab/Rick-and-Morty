const express = require("express");
const router = express.Router();

const {postFav, deleteFav, getFavorites} = require("../controllers/handleFavorites");

router.get("/", getFavorites);
router.post("/", postFav);
router.delete("/:id", deleteFav);

module.exports = router;