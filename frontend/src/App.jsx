import { useEffect, useState } from "react";
import { livrosService } from "./services/livrosService";

export default function App() {
  const [livros, setLivros] = useState([]);

  const carregarLivros = async () => {
    const resposta = await livrosService.listar();
    setLivros(resposta);
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  return (
    <div>
      <h1>Lista de Livros</h1>
      <ul>
        {livros.map((livro) => (
          <li key={livro.id}>
              {livro.titulo} - {livro.autor}
          </li>
        ))}
      </ul>
    </div>
  );
}