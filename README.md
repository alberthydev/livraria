# livraria

## descrição

sistema de gerênciamento simples de livros

## tecnologias

- node.js / express
- react / vite
- banco de dados: sqlite
- autenticação: session-id

## GitHub Actions

O pipeline tem dois jobs paralelos, um para cada pasta do repositório:

 - Job `backend`: Entra na `backend/`, instala as dependências do Express e verifica se o código não tem erros de sintaxe.
 - Job `frontend`: Entra na pasta `frontend/`, instala as dependências do React e roda o `npm run build` do Vite, que já valida se o projeto compila sem erros.

O `cache: 'npm'` com `cache-dependency-path` acelera as execuções seguintes, o GitHub reutiliza o `node-modules` em vez de baixar tudo do zero a cada push
