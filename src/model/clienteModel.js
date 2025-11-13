
const conexao = require('./Conexao'); // Importa o pool de conexão MySQL

const clienteModel = {
    /**
     * Busca todos os clientes
     */
    buscarTodos: async () => {
        try {
            // Usa o pool de conexão para fazer a query
            const [rows] = await conexao.query("SELECT * FROM cliente");
            return rows;
        } catch (error) {
            console.error("Erro no model ao buscar clientes:", error);
            throw error; // Joga o erro para o controller tratar
        }
    },

    /**
     * Cria um novo cliente
     */
    criarCliente: async (cliente) => {
        try {
            const { nomeCliente, cpfCliente } = cliente;
            const sql = "INSERT INTO cliente (nomeCliente, cpfCliente) VALUES (?, ?)";
            const values = [nomeCliente, cpfCliente];
            
            // Executa a query
            const [result] = await conexao.query(sql, values);
            return result; // Retorna o resultado da inserção
        } catch (error) {
            console.error("Erro no model ao criar cliente:", error);
            throw error;
        }
    },
    
    // Busca um cliente pelo CPF
     
    buscarPorCpf: async (cpf) => {
        try {
            const sql =  `SELECT * FROM cliente WHERE cpfCliente = ${cpf}`;
            // [cpf] é um array com os valores para os '?'
            const [rows] = await conexao.query(sql, [cpf]);
            return rows; // Retorna uma lista (vazia ou com 1 cliente)
        } catch (error) { 
            console.error("Erro no model ao buscar por CPF:", error);
            throw error;
        }
    }
};

module.exports = clienteModel;