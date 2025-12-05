
const { getConnection } = require('../config/db'); // Importação correta da função

const clienteModel = {
    /**
     * Busca todos os clientes
     */
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

    /**
     * Cria um novo cliente
     */
    criarCliente: async (cliente) => {
        try {
            const pool = await getConnection();
            const { nomeCliente, cpfCliente, emailCliente, senhaCliente } = cliente;
            
            // CORREÇÃO: Adicionados 4 pontos de interrogação para os 4 campos
            const sql = "INSERT INTO cliente (nomeCliente, cpfCliente, emailCliente, senhaCliente) VALUES (?, ?, ?, ?)";
            const values = [nomeCliente, cpfCliente, emailCliente, senhaCliente];
            
            const [result] = await pool.query(sql, values);
            return result;
        } catch (error) {
            console.error("Erro no model ao criar cliente:", error);
            throw error;
        }
    },
    
    /**
     * Busca um cliente pelo CPF
     */
    buscarPorCpf: async (cpf) => {
        try {
            const pool = await getConnection();
            // CORREÇÃO: Uso de ? para evitar SQL Injection
            const sql = "SELECT * FROM cliente WHERE cpfCliente = ?";
            const [rows] = await pool.query(sql, [cpf]);
            return rows; 
        } catch (error) { 
            console.error("Erro no model ao buscar por CPF:", error);
            throw error;
        }
    }
};

module.exports = { clienteModel }; // Exportando como objeto (com chaves)