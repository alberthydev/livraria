const db = require("../database/sqlite");

class ReviewRepository {
  async create(userId, bookId, data) {
    
    const sql = `
      INSERT INTO user_books (user_id, book_id, review, rating, status)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const result = await db.run(sql, [
      userId, 
      bookId, 
      data.review, 
      data.rating, 
      data.status || 'Lido' 
    ]);

    return { id: result.lastInsertRowid, userId, bookId, ...data };
  }

  async findByBookId(bookId) {
    const sql = `
      SELECT ub.*, u.username 
      FROM user_books ub
      JOIN users u ON ub.user_id = u.id
      WHERE ub.book_id = ?
    `;
    return await db.all(sql, [bookId]);
  }
}

module.exports = new ReviewRepository();