import React, { useState, useEffect } from 'react';
import { livrosService } from '../services/livrosService';
import api from '../services/api'; 
import LivroCard from '../components/LivroCard';
import LivroForm from '../components/LivroForm';
import './Livros.css';

const Livros = () => {
  const [livros, setLivros] = useState([]);
  const [favoritosIds, setFavoritosIds] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingLivro, setEditingLivro] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [listaLivros, listaFavoritos] = await Promise.all([
        livrosService.listar(),
        api.get('/favorites') 
      ]);
      
      setLivros(listaLivros);
      
      setFavoritosIds(listaFavoritos.data.map(f => f.id));
    } catch (err) {
      setError('Erro ao carregar dados.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (livro) => {
    try {
      await api.post('/favorites', { bookId: livro.id });
      
      if (favoritosIds.includes(livro.id)) {
        setFavoritosIds(prev => prev.filter(id => id !== livro.id));
      } else {
        setFavoritosIds(prev => [...prev, livro.id]);
      }
    } catch (error) {
      console.error("Erro ao favoritar", error);
    }
  };

  const handleCreate = () => { setEditingLivro(null); setShowForm(true); };
  const handleEdit = (livro) => { setEditingLivro(livro); setShowForm(true); };
  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja remover este livro?')) {
      try {
        await livrosService.remover(id);
        setLivros(prev => prev.filter(l => l.id !== id));
        showSuccess('Livro removido com sucesso!');
      } catch (err) {
        setError('Erro ao remover livro.');
        console.error(err);
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingLivro) {
        const response = await livrosService.atualizar(editingLivro.id, formData);
        
        const livroAtualizado = response.data || response; 
        
        setLivros(prev => prev.map(l => 
          l.id === editingLivro.id ? livroAtualizado : l
        ));
        showSuccess('Livro atualizado com sucesso!');
      } else {
        const response = await livrosService.criar(formData);
        
        const novoLivro = response.data || response;
        
        setLivros(prev => [...prev, novoLivro]);
        showSuccess('Livro criado com sucesso!');
      }
      
      setShowForm(false);
      setEditingLivro(null);
    } catch (err) {
      setError('Erro ao salvar livro.');
      console.error(err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingLivro(null);
  }; 

  if (loading) return <div className="loading">Carregando livros...</div>;

  return (
    <div className="container">
      <div className="livros-header">
        <h1>Meus Livros</h1>
        <button onClick={handleCreate} className="btn btn-primary">
          ➕ Adicionar Livro
        </button>
      </div>
      
      <div className="livros-grid">
        {livros.map((livro) => (
          <LivroCard
            key={livro.id}
            livro={livro}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isFavorite={favoritosIds.includes(livro.id)} 
            onToggleFavorite={handleToggleFavorite} 
          />
        ))}
      </div>

      {showForm && (
        <LivroForm
          livro={editingLivro}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Livros;