const express = require("express");
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const LivrosController = require("../controller/livros.controller");
const livrosController = new LivrosController();
const reviewController = require("../controller/review.controller");

router.get("/", livrosController.listarLivros.bind(livrosController));
router.get("/:id", livrosController.buscarLivroPorId.bind(livrosController));
router.post("/", livrosController.criarLivro.bind(livrosController));
router.put("/:id", livrosController.atualizarLivro.bind(livrosController));
router.delete("/:id", livrosController.removerLivro.bind(livrosController));

router.post("/:id/reviews", requireAuth, reviewController.store.bind(reviewController));
router.get("/:id/reviews", reviewController.index.bind(reviewController));

module.exports = router;