const db = require("../database/sqlite");
const RepositoryBase = require("./repositorie.interface");
const Livro = require("../models/livro.model");

class LivrosRepository extends RepositoryBase {
  async findAll() {
    const rows = await db.all("SELECT id, titulo, autor, categoria, editora, paginas, ano FROM livros ORDER BY id ASC");
    return rows.map(r => Livro.fromJSON(r));
  }
  async findById(id) {
    const row = await db.get("SELECT id, titulo, autor, categoria, editora, paginas, ano FROM livros WHERE id = ?", [id]);
    return row ? Livro.fromJSON(row) : null;
  }
  async create(data) {
    const novo = new Livro({ id: null, ...data });
    const res = await db.run(
      "INSERT INTO livros (titulo, autor, categoria, editora, paginas, ano) VALUES (?, ?, ?, ?, ?, ?)",
      [novo.titulo, novo.autor, novo.categoria, novo.editora, novo.paginas, novo.ano]
    );
    console.log(res.id);
    return this.findById(res.id);
  }

  async update(id, dados) {
    const atual = new Livro({ id, ...dados });
    await db.run(
      "UPDATE livros SET titulo = ?, autor = ?, categoria = ?, editora = ?, paginas = ?, ano = ? WHERE id = ?",
      [atual.titulo, atual.autor, atual.categoria, atual.editora, atual.paginas, atual.ano, id]
    );
    return this.findById(id);
  }
  async delete(id) {
    const existente = await this.findById(id);
    if (!existente) {
      const e = new Error("Livro não encontrado");
      e.statusCode = 404; throw e;
    }
    await db.run("DELETE FROM livros WHERE id = ?", [id]);
    return existente;
  }
}
module.exports = LivrosRepository;