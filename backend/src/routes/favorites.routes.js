const express = require("express");
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const favoritesController = require("../controller/favorites.controller");

router.post("/", requireAuth, favoritesController.toggle.bind(favoritesController));

router.get("/", requireAuth, favoritesController.list.bind(favoritesController));

module.exports = router;