const { clienteModel } = require("../model/clienteModel");
const bcrypt = require('bcrypt');

const clienteController = {
    listarClientes: async (req, res) => {
        try {            
            const clientes = await clienteModel.buscarTodos();
            res.status(200).json(clientes);
        } catch (error) {
            console.error('Erro ao listar clientes:', error);
            res.status(500).json({ error: `Erro ao buscar clientes.` });
        }
    },

    criarCliente: async (req, res) => {
        try {
            const { nomeCliente, cpfCliente, emailCliente, senhaCliente } = req.body;

            // Validação
            if (!nomeCliente || !cpfCliente || !emailCliente || !senhaCliente) {
                return res.status(400).json({ erro: "Todos os campos (nome, cpf, email, senha) são obrigatórios." });
            }

            // 1. Verificar se CPF existe (usando o nome correto da função do model)
            const clienteExistente = await clienteModel.buscarPorCpf(cpfCliente);

            if (clienteExistente.length > 0) {
                return res.status(409).json({ erro: "CPF já cadastrado!" });
            }
            
            // 2. Criptografia
            const saltRounds = 10;
            // CORREÇÃO: Criamos uma nova variável, pois não podemos alterar a const senhaCliente original
            const senhaCriptografada = await bcrypt.hash(senhaCliente, saltRounds);

            // 3. Objeto para enviar ao model
            const novoCliente = {
                nomeCliente, 
                cpfCliente,  
                emailCliente, 
                senhaCliente: senhaCriptografada // Manda a senha hash
            };

            // 4. Inserir (usando o nome correto da função do model)
            await clienteModel.criarCliente(novoCliente);

            res.status(201).json({ message: "Cliente cadastrado com sucesso!" });
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            res.status(500).json({ error: `Erro ao cadastrar cliente.` });
        }
    }
};

module.exports = { clienteController };