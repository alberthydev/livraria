# API Livraria

Descrição
A API Livraria fornece operações CRUD para gerenciar livros (listar, consultar, criar, atualizar e remover). Este README contém instruções básicas de instalação, execução e exemplos de uso.

Tecnologias

- Node.js / Express (exemplo)
- Banco de dados: SQLite / PostgreSQL / MongoDB (conforme implementação)
- Autenticação: JWT (opcional)

Instalação

1. Clone o repositório:
   git clone `<repo-url>` /home/albert/dev/livraria
2. Instale dependências:
   npm install
3. Configure variáveis de ambiente (exemplo .env):
   - PORT=3000
   - DATABASE_URL=...
   - JWT_SECRET=...

Execução

- Desenvolvimento:
  npm run dev
- Produção:
  npm start

Endpoints principais

- GET /livros
  - Lista todos os livros (opções de paginação e filtros conforme implementação).
- GET /livros/:id
  - Retorna os dados de um livro pelo id.
- POST /livros
  - Cria um novo livro.
  - Body (JSON) exemplo:
    {
    "titulo": "Nome do Livro",
    "autor": "Autor",
    "ano": 2020,
    "preco": 49.90,
    "categoria": "Ficção"
    }
- PUT /livros/:id
  - Atualiza os dados de um livro.
- DELETE /livros/:id
  - Remove um livro.

Exemplos com curl

- Listar:
  curl -X GET http://localhost:3000/livros
- Criar:
  curl -X POST http://localhost:3000/livros 
  -H "Content-Type: application/json" 
  -d '{"titulo":"Exemplo","autor":"Fulano","ano":2021,"preco":29.9}'

Autenticação
Se a API exigir autenticação JWT, inclua no header:
Authorization: Bearer `<token>`

Tratamento de erros

- Respostas devem usar códigos HTTP apropriados (200, 201, 400, 401, 404, 500).
- Retornar mensagens de erro claras no corpo JSON:
  { "error": "Mensagem descritiva" }

Testes

- Adicione testes automatizados (jest / mocha) conforme necessidade.
- Comando sugerido:
  npm test

Contribuição

- Abra issues para bugs ou features.
- Fork, branch com feature/bugfix e PR com descrição clara.

Licença

- Defina uma licença no repositório (ex: MIT). Atualize conforme necessário.

Contato

- Adicione instruções de contato ou link para o repositório.
