const express = require("express");
const router = express.Router();

const livrosRoutes = require("./livros.routes");
const authRoutes = require("./auth.routes");
const favoritesRoutes = require("./favorites.routes");

router.get("/", (req, res) => {
  res.status(200).json({
    mensagem: "Bem-vindo à API da livraria! Use /auth/login para entrar.",
  });
});

router.use("/livros", livrosRoutes);
router.use("/auth", authRoutes);
router.use("/favorites", favoritesRoutes); 

module.exports = router;