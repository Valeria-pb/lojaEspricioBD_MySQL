
const { getConnection } = require('../config/db');

const clienteModel = {
    buscarTodos: async () => {
        try {
            const pool = await getConnection();
            const [rows] = await pool.query("SELECT * FROM cliente");
            return rows;
        } catch (error) {
            console.error("Erro no model ao buscar clientes:", error);
            throw error;
        }
    },

    criarCliente: async (cliente) => {
        try {
            const pool = await getConnection();
            const { nomeCliente, cpfCliente, emailCliente, senhaCliente } = cliente;
            const sql = "INSERT INTO cliente (nomeCliente, cpfCliente, emailCliente, senhaCliente) VALUES (?, ?, ?, ?)";
            const values = [nomeCliente, cpfCliente, emailCliente, senhaCliente];
            const [result] = await pool.query(sql, values);
            return result;
        } catch (error) {
            console.error("Erro no model ao criar cliente:", error);
            throw error;
        }
    },
    
    buscarPorCpf: async (cpf) => {
        try {
            const pool = await getConnection();
            const sql = "SELECT * FROM cliente WHERE cpfCliente = ?";
            const [rows] = await pool.query(sql, [cpf]);
            return rows; 
        } catch (error) { 
            console.error("Erro no model ao buscar por CPF:", error);
            throw error;
        }
    },

    // AQUI ESTÁ A FUNÇÃO QUE FALTAVA PARA O LOGIN FUNCIONAR
    buscarEmailOrCPF: async(cpfCliente, emailCliente) => {
        try {
            const pool = await getConnection();
            // Verifica se existe o CPF OU o Email
            let querySQL = "SELECT * FROM cliente WHERE cpfCliente = ? OR emailCliente = ?";
            const [rows] = await pool.query(querySQL, [cpfCliente, emailCliente]);
            return rows;

        } catch (error) {
            console.error("Erro ao buscar cliente por Email/CPF", error);
            throw error;
        }
    }
};

module.exports = { clienteModel };