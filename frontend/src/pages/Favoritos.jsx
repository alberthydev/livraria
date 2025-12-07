import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LivroCard from '../components/LivroCard';
import './Livros.css'; // Reusa o CSS

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarFavoritos();
  }, []);

  const carregarFavoritos = async () => {
    try {
      const response = await api.get('/favorites');
      setFavoritos(response.data);
    } catch (error) {
      console.error("Erro ao carregar favoritos", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (livro) => {
    try {
      await api.post('/favorites', { bookId: livro.id });
      setFavoritos(prev => prev.filter(f => f.id !== livro.id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="loading">Carregando favoritos...</div>;

  return (
    <div className="container">
      <h1>Meus Favoritos ❤️</h1>
      {favoritos.length === 0 ? (
        <p>Você ainda não tem livros favoritos.</p>
      ) : (
        <div className="livros-grid">
          {favoritos.map(livro => (
            <LivroCard
              key={livro.id}
              livro={livro}
              isFavorite={true}
              onToggleFavorite={handleToggleFavorite}
              onEdit={() => { }}
              onDelete={() => { }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;
