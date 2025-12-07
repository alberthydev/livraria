import React from 'react';
import { Link } from 'react-router-dom';
import './LivroCard.css';

const LivroCard = ({ livro, onEdit, onDelete, isFavorite, onToggleFavorite }) => {
  return (
    <div className="livro-card">
      <div className="card-header">
        <h3>{livro.titulo}</h3>
        {/* Botão de Favoritar */}
        <button
          onClick={() => onToggleFavorite(livro)}
          className="btn-favorite"
          title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <p><strong>Autor:</strong> {livro.autor}</p>
      <p><strong>Categoria:</strong> {livro.categoria}</p>

      <div className="card-actions">
        <Link to={`/livros/${livro.id}`} className="btn btn-info">
          ️Detalhes
        </Link>

        <button onClick={() => onEdit(livro)} className="btn btn-primary">
          Editar
        </button>
        <button onClick={() => onDelete(livro.id)} className="btn btn-danger">
          ️Remover
        </button>
      </div>
    </div>
  );
};

export default LivroCard;
