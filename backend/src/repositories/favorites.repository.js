const db = require("../database/sqlite");

class FavoritesRepository {
  async add(userId, bookId) {
    try {
      await db.run("INSERT INTO favorites (user_id, book_id) VALUES (?, ?)", [userId, bookId]);
      return { status: 'added' };
    } catch (error) {
      throw error;
    }
  }

  async remove(userId, bookId) {
    await db.run("DELETE FROM favorites WHERE user_id = ? AND book_id = ?", [userId, bookId]);
    return { status: 'removed' };
  }

  async check(userId, bookId) {
    const row = await db.get("SELECT * FROM favorites WHERE user_id = ? AND book_id = ?", [userId, bookId]);
    return !!row;
  }

  async listByUser(userId) {
    const sql = `
      SELECT l.* FROM books l
      JOIN favorites f ON l.id = f.book_id
      WHERE f.user_id = ?
    `;
    const sqlCorrect = `
      SELECT l.* FROM livros l
      JOIN favorites f ON l.id = f.book_id
      WHERE f.user_id = ?
    `;
    return await db.all(sqlCorrect, [userId]);
  }
}

module.exports = new FavoritesRepository();
