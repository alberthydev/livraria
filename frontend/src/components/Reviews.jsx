import React, { useState } from 'react';
const Reviews = ({ reviews, onAddReview }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReview({ review: comment, rating: parseInt(rating), status: 'Lido' });
    setComment("");
  };

  return (
    <div style={{ marginTop: '30px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
      <h3>Avaliações e Comentários</h3>
      
      <div className="reviews-list" style={{ marginBottom: '20px' }}>
        {reviews.length === 0 ? (
          <p>Seja o primeiro a avaliar este livro!</p>
        ) : (
          reviews.map((rev, index) => (
            <div key={index} style={{ 
              background: 'var(--bg-color)', 
              padding: '10px', 
              borderRadius: '5px', 
              marginBottom: '10px',
              border: '1px solid var(--border-color)'
            }}>
              <strong>{rev.username || 'Usuário'}</strong> - 
              <span style={{ color: '#f1c40f' }}> {'★'.repeat(rev.rating)}</span>
              <p style={{ margin: '5px 0' }}>{rev.review}</p>
            </div>
          ))
        )}
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h4>Deixe sua avaliação</h4>
        <select 
          value={rating} 
          onChange={(e) => setRating(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px' }}
        >
          <option value="5">5 Estrelas - Excelente</option>
          <option value="4">4 Estrelas - Muito Bom</option>
          <option value="3">3 Estrelas - Bom</option>
          <option value="2">2 Estrelas - Regular</option>
          <option value="1">1 Estrela - Ruim</option>
        </select>
        
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Escreva o que achou do livro..."
          required
          style={{ padding: '10px', borderRadius: '4px', minHeight: '80px' }}
        />
        
        <button type="submit" className="btn btn-primary">Enviar Avaliação</button>
      </form>
    </div>
  );
};

export default Reviews;