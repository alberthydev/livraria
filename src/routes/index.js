const express = require("express");
const router = express.Router();

const livrosRoutes = require("./livros.routes");
const authRoutes = require("./auth.routes")

router.get("/", (req, res) => {
  res.status(200).json({
    mensagem: "Bem-vindo à API da livraria! Use seu usuário com /login para visualizar e gerênciar os livros em /livros",
  });
});

router.use("/livros", livrosRoutes);
router.use("/auth", authRoutes);

module.exports = router;