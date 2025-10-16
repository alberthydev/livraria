class Livro {
  constructor({ id = null, titulo, autor, categoria, editora, paginas, ano }) {
    this.id = id !== undefined ? id : null;
    this.titulo = titulo ? String(titulo).trim() : '';
    this.autor = autor ? String(autor).trim() : '';
    this.categoria = categoria ? String(categoria).trim() : '';
    this.editora = editora ? String(editora).trim() : '';
    this.paginas = Number.isInteger(paginas) ? paginas : parseInt(paginas, 10);
    this.ano = Number.isInteger(ano) ? ano : parseInt(ano, 10);
    this._validar();
  }
  _validar() {
    const erros = [];
    if (!this.titulo || this.titulo.trim().length === 0) erros.push('Título é obrigatório');
    if (!this.autor || this.autor.trim().length === 0) erros.push('Autor é obrigatório');
    if (!this.categoria || this.categoria.trim().length === 0) erros.push('Categoria é obrigatória');
    if (!this.editora || this.editora.trim().length === 0) erros.push('Editora é obrigatório');
    if (!Number.isInteger(this.paginas) || isNaN(this.paginas)) erros.push('Paginas deve ser um número válido');
    if (!Number.isInteger(this.ano) || isNaN(this.ano)) erros.push('Ano deve ser um número válido');
    if (erros.length > 0) {
      const error = new Error('Dados inválidos');
      console.log(erros);
      error.statusCode = 400;
      error.details = erros;
      throw error;
    }
  }

  static fromJSON(json) {
    return new Livro({
      id: json.id ?? null,
      titulo: json.titulo,
      autor: json.autor,
      categoria: json.categoria,
      editora: json.editora,
      paginas: json.paginas,
      ano: json.ano,
    });
  }
  toJSON() {
    return {
      id: this.id,
      titulo: this.titulo,
      autor: this.autor,
      categoria: this.categoria,
      editora: this.editora,
      paginas: this.paginas,
      ano: this.ano,
    };
  }
}

module.exports = Livro;
