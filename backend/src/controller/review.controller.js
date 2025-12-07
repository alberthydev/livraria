const reviewRepository = require('../repositories/review.repository');

class ReviewController {

  async store(req, res) {
    try {
      const { id } = req.params;
      const bookId = id;
      const { review, rating, status } = req.body;
      const userId = req.session.userId;

      if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' });

      const newReview = await reviewRepository.create(userId, bookId, { review, rating, status });
      return res.status(201).json(newReview);
    } catch (error) {
      console.error(error);
      if (error.message && error.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'Você já avaliou este livro' });
      }
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  async index(req, res) {
    try {
      const { id } = req.params; // bookId
      const reviews = await reviewRepository.findByBookId(id);
      res.json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar reviews' });
    }
  }
}

module.exports = new ReviewController();
