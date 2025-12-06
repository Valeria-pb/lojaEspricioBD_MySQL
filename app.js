const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;




//alt+seta move linhas
//shit+alt+f = organiza cod.

// --- Configurações Essenciais ---
// 1. Diz ao Express para entender requisições com corpo em JSON
app.use(express.json());


// --- Rotas ---
// 2. Importa o arquivo de rotas do cliente
// (Note o caminho './src/...' pois o app.js está na raiz)
const clienteRoutes = require('./src/routes/clienteRoutes');
//const produtoRoutes = require('./src/routes/produtosRoutes');

// 3. Diz ao app para usar as rotas importadas
// Vamos adicionar um prefixo '/api' (boa prática)
// Agora suas rotas serão:
// GET http://localhost:3000/api/clientes
// POST http://localhost:3000/api/clientes
app.use('/', clienteRoutes);
//app.use('/', produtoRoutes);

// --- Iniciar o Servidor ---
// 4. "Liga" o servidor na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    
});

