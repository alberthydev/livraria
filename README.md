# api livraria

## descrição

a api livraria fornece operações crud para gerenciar livros (listar, consultar, criar, atualizar e remover) protegidas por autenticação.

## tecnologias

- node.js / express
- banco de dados: sqlite
- autenticação: session-id

## endpoints

* /register -> Criar um novo usuário:

  ```json
  {
    "fullname":"Seu Nome Completo",
    "email":"seuemail@seuemail.com",
    "username":"seu_usuario",
    "password":"sua_senha"
  }
  ```

  o e-mail é único de cada usuário, porém, assim como o nome completo, ele não é obrigatório, foi implementado por convenicência de login.
* /login -> logar no usuário cadastrado, caso o usuário possua e-mail, ele pode ser utilizado para autenticação:

  ```json
  {
    "email":"seuemail@seuemail.com",
    "password":"sua_senha"
  }
  ```

  caso só possua o usuário, a forma de autenticação é a mesma, porém, com o usuário:

  ```json
  {
    "username":"seu_usuario",
    "password":"sua_senha"
  }
  ```

  {
* /me -> retorna informações do usuário logado do momento:

  ```json
  {
    "fullname":"Seu Nome Completo",
    "email":"seuemail@seuemail.com",
    "username":"seu_usuario",
    "create_at":"data_de_criação_do_usuario"
  }

  ```
* /logout -> desautentica o usuário logado do momento;
* /livros -> lista todos os livros cadastrados (necessário autenticação);
* /livros/$id -> retorna o livro {id} digitado (necessário autenticação);
* /livros -> com o método post, pode ser feito cadastro de livros com a seguinte estrutura: (necessário autenticação);

  ```json
  {
    "titulo":"Seu Livro",
    "autor":"Autor Livro",
    "categoria":"Categoria Livro",
    "editora":"Editora Livro",
    "paginas":int,
    "ano":int
  }
  ```
* /livros/$id -> com o método put, pode ser feito alteração do livro especifico do {id} fornecido: (necessário autenticação);

  ```json
  {
    "titulo":"Seu Livro Atualizado",
    "autor":"Autor Livro Atualizado",
    "categoria":"Categoria Livro Atualizado",
    "editora":"Editora Livro Atualizado",
    "paginas":int, 
    "ano":int
  }
  ```
* /livros/$id -> com o método delete, é feito a exclusão do livro do {id} fornecido. (necessário autenticação);
