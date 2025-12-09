const favoritesRepo = require("../repositories/favorites.repository");

class FavoritesController {
  async toggle(req, res) {
    try {
      const userId = req.session.userId;
      const { bookId } = req.body;

      if (!userId) return res.status(401).json({ error: 'Login necessário' });

      const exists = await favoritesRepo.check(userId, bookId);

      if (exists) {
        await favoritesRepo.remove(userId, bookId);
        return res.json({ favorited: false });
      } else {
        await favoritesRepo.add(userId, bookId);
        return res.json({ favorited: true });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async list(req, res) {
    try {
      const userId = req.session.userId;
      if (!userId) return res.status(401).json({ error: 'Login necessário' });

      const books = await favoritesRepo.listByUser(userId);
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new FavoritesController();
