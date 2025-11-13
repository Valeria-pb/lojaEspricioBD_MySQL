# API Loja com Node.js e MySQL (lojaEspricioBD_MySQL)

Este é um projeto de backend desenvolvido em Node.js que serve como uma API RESTful para gerenciar os dados de uma loja. A aplicação utiliza o Express.js para a criação das rotas e o `mysql2` para se conectar e interagir com um banco de dados MySQL.

O foco inicial deste projeto é construir o **CRUD** (Criar, Ler, Atualizar, Deletar) para a entidade de **Clientes**.

##  Tecnologias Utilizadas

* **Node.js:** Ambiente de execução para o JavaScript no lado do servidor.
* **Express.js:** Framework para criar o servidor e gerenciar as rotas da API.
* **MySQL2:** Driver otimizado para a conexão entre o Node.js e o banco de dados MySQL.

##  Como Executar o Projeto

Siga os passos abaixo para rodar o projeto localmente.



### Passos

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Valeria-pb/lojaEspricioBD_MySQL.git](https://github.com/Valeria-pb/lojaEspricioBD_MySQL.git)
    cd lojaEspricioBD_MySQL
    ```

2.  **Instale as dependências:**
    (Este comando irá baixar o `express` e o `mysql2` com base no `package.json`)
    ```bash
    npm install
    ```

3.  **Configure o Banco de Dados:**
    * Certifique-se de que seu servidor MySQL está rodando.
    * Crie um banco de dados para este projeto (ex: `loja_db`).
    * **Importante:** Abra o arquivo `src/model/Conexao.js` e atualize as credenciais (`host`, `user`, `password`, `database`) para as do seu ambiente local.

4.  **Inicie o servidor:**
    (Este comando executa o arquivo `app.js`)
    ```bash
    node app.js
    ```

5.  **Pronto!** O servidor estará rodando em `http://localhost:3000`.

##  Endpoints da API

A API utiliza o prefixo `/api` para todas as rotas.

### Clientes (`/api/clientes`)

* `GET /api/clientes`: Retorna uma lista de todos os clientes.
* `POST /api/clientes`: Cria um novo cliente.
* `GET /api/clientes/:id`: Busca um cliente específico pelo `id`.
* `PUT /api/clientes/:id`: Atualiza um cliente específico pelo `id`.
* `DELETE /api/clientes/:id`: Deleta um cliente específico pelo `id`.