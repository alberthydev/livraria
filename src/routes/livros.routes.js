const express = require("express");
const router = express.Router();
const { requireAuth } = require('../middleware/auth');

// Controllers
const LivrosController = require("../controller/livros.controller");
const livrosController = new LivrosController();

router.get("/", requireAuth, livrosController.listarLivros.bind(livrosController));
router.get("/:id", requireAuth, livrosController.buscarLivroPorId.bind(livrosController));
router.post("/", requireAuth, livrosController.criarLivro.bind(livrosController));
router.put("/:id", requireAuth, livrosController.atualizarLivro.bind(livrosController));
router.delete("/:id", requireAuth, livrosController.removerLivro.bind(livrosController));
module.exports = router;
