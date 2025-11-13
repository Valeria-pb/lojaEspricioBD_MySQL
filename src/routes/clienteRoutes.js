const express = require('express');
const router = express.Router();

// Importa o controller 
const clienteController = require('../controller/clienteController');

// Define as rotas
// GET /clientes -> Chama a função listarClientes
router.get('/clientes', clienteController.listarClientes);

// POST /clientes -> Chama a função criarCliente
router.post('/clientes', clienteController.criarCliente);

// Exporta o router para o app.js poder usá-lo
module.exports = router;