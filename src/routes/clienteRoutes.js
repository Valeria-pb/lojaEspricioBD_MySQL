const express = require('express');
const router = express.Router();

// Importa o controller 
const {clienteController} = require('../controller/clienteController');
const {authController}= require("../controller/authController");
const {verify} = require("../middleware/authMiddleware");

// Define as rotas

router.post("/clientes/login", authController.clienteLogin);

router.get('/clientes', verify.cliente, clienteController.listarClientes);

router.post('/clientes', clienteController.criarCliente);

// Exporta o router para o app.js poder usá-lo
module.exports = router;