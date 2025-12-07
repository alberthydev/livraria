import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { livrosService } from '../services/livrosService';
import Reviews from '../components/Reviews';
import api from '../services/api';

const LivroDetalhes = () => {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    carregarDados();
  }, [id]);

  const carregarDados = async () => {
    try {
      setLoading(true);

      const livroData = await livrosService.buscarPorId(id);
      setLivro(livroData);

      const reviewsResponse = await api.get(`/livros/${id}/reviews`);
      setReviews(reviewsResponse.data);

    } catch (error) {
      console.error("Erro ao carregar detalhes", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (reviewData) => {
    try {
      await api.post(`/livros/${id}/reviews`, reviewData);
      setReviews([...reviews, { ...reviewData, username: 'Você' }]);
      alert("Avaliação enviada!");
    } catch (error) {
      alert("Erro ao enviar avaliação: " + (error.response?.data?.error || error.message));
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;
  if (!livro) return <div className="container">Livro não encontrado.</div>;

  return (
    <div className="container">
      <div style={{ background: 'var(--card-bg)', padding: '20px', borderRadius: '8px' }}>
        <Link to="/livros" className="btn btn-secondary" style={{ marginBottom: '15px', display: 'inline-block' }}>← Voltar</Link>
        <h1>{livro.titulo}</h1>
        <p><strong>Autor:</strong> {livro.autor}</p>
        <p><strong>Editora:</strong> {livro.editora}</p>
        <p><strong>Ano:</strong> {livro.ano}</p>
        <p><strong>Páginas:</strong> {livro.paginas}</p>
        <p><strong>Categoria:</strong> {livro.categoria}</p>
        <Reviews reviews={reviews} onAddReview={handleAddReview} />
      </div>
    </div>
  );
};

export default LivroDetalhes;
