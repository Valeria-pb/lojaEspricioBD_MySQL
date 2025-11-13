// src/controller/clienteController.js
const clienteModel = require('../model/clienteModel'); // Importa o Model

const clienteController = {
    /**
     * Lista todos os clientes (GET)
     */
    listarClientes: async (req, res) => {
        try {
            const clientes = await clienteModel.buscarTodos();
            res.status(200).json(clientes); // Retorna 200 OK e a lista de clientes
        } catch (error) {
            console.error("Erro no controller ao listar clientes:", error);
            res.status(500).json({ erro: "Erro no servidor." });
        }
    },

    /**
     * Cria um novo cliente (POST) - COM O DESAFIO
     */
    criarCliente: async (req, res) => {
        try {
            const { nomeCliente, cpfCliente } = req.body;

            // ---- INÍCIO DO DESAFIO (TAREFA 3) ----
            // 1. Verifica se o CPF já existe
            const clienteExistente = await clienteModel.buscarPorCpf(cpfCliente);
            
            if (clienteExistente.length > 0) {
                // 2. Se existe, retorna status 409 (Conflito)
                return res.status(409).json({ erro: "CPF já cadastrado." });
            }
            // ---- FIM DO DESAFIO ----

            // 3. Se não existe, prossegue com a criação
            const novoCliente = { nomeCliente, cpfCliente };
            const result = await clienteModel.criarCliente(novoCliente);

            // 4. Retorna 201 Created
            res.status(201).json({ 
                message: "Cliente criado com sucesso!",
                idCliente: result.insertId // Retorna o ID do novo cliente
            });

        } catch (error) {
            console.error("Erro no controller ao criar cliente:", error);
            res.status(500).json({ erro: "Erro no servidor." });
        }
    }
};

module.exports = clienteController;