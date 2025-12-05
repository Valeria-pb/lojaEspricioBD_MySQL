// Assumindo que seu '../config/db' agora usa 'mysql2/promise'
// A importação 'sql' (para tipos) geralmente não é necessária com 'mysql2'
const { getConnection } = require("../config/db"); 

const produtoModel = {
    /**
     * Busca todos os produtos no banco de dados.
     * * @async
     * @function buscarTodos
     * @returns {Promise<Array>} Retorna uma lista com todos os produtos.
     * @throws Mostra no console e propaga o erro caso a busca falhe.
     */
    buscarTodos: async () => {
        try {
            const pool = await getConnection(); // Estabelecendo conexão (pegando o pool)
            
            const querySQL = 'SELECT * FROM Produtos';
            
            // A sintaxe [rows] desestrutura o resultado [rows, fields]
            // 'rows' é o equivalente ao 'recordset'
            const [rows] = await pool.query(querySQL);
            
            return rows; 

        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            throw error; //Reverberar o erro para a função que o chamar
        }
    },

    /**
     * Busca um produto específico pelo ID.
     * * @async
     * @function buscarUm
     * @param {string|number} idProduto - O ID do produto a ser buscado.
     * @returns {Promise<array>} - Retorna uma lista com o produto filtrado.
     * @throws Mostra no console e propaga o erro caso a busca falhe
     */
    buscarUm: async (idProduto) => {
        try {
            const pool = await getConnection();
            
            const querySQL = `
                SELECT * FROM Produtos
                WHERE idProduto = ? 
            `; // Usando '?' como placeholder

            // Passamos os parâmetros em um array, na ordem dos '?'
            const [rows] = await pool.query(querySQL, [idProduto]);
            
            return rows;

        } catch (error) {
            console.error("Erro ao buscar produto", error);
            throw error;
        }
    },

    /**
     * Atualiza um produto existente.
     * (Note: Corrigi alguns erros do seu código original aqui)
     * * @async
     * @function atualizarPdrodutos
     * @param {string|number} idProduto
     * @param {string} nomeProduto
     * @param {number} precoProduto
     * @throws Mostra no console e propaga o erro caso a atualização falhe
     */
    atualizarPdrodutos: async (idProduto, nomeProduto, precoProduto) => {
        try {
            // CORREÇÃO: Era 'pool -' no seu código, mudei para 'pool ='
            const pool = await getConnection(); 
            
            // CORREÇÃO: A tabela é 'Produtos', não 'atualizarPdrodutos'
            const querySQL = `
                UPDATE Produtos 
                SET nomeProduto = ?, 
                    precoProduto = ?
                WHERE idProduto = ?
            `; // Usando '?' para os parâmetros
            
            // Os parâmetros são passados em um array, na ordem dos '?'
            await pool.query(querySQL, [nomeProduto, precoProduto, idProduto]);
            
            // A função original não tinha a execução da query nem o 'catch' preenchido

        } catch (error) {
            // CORREÇÃO: Adicionado tratamento de erro
            console.error("Erro ao atualizar produto:", error);
            throw error;
        }
    },

    /**
     * Insere um novo produto no banco de dados.
     * * @async
     * @function inserirProduto
     * @param {string} nomeProduto - Nome do produto a ser cadastrado
     * @param {number} precoProduto - Preço do produto a ser cadastrado
     * @returns {Promise<void>} - Não retorna nada, apenas executa a inserção
     * @throws Mostra no console e propaga o erro caso a inserção falhe
     */
    inserirProduto: async (nomeProduto, precoProduto) => {
        try {
            const pool = await getConnection(); // Estabelecendo conexão com o DB 
            
            const querySQL = `
                INSERT INTO Produtos (nomeProduto, precoProduto)
                VALUES (?, ?)
            `; // Usando '?' como placeholders

            // Passando os parâmetros em um array
            await pool.query(querySQL, [nomeProduto, precoProduto]);

        } catch (error) {
            console.error("Erro ao inserir produto:", error);
            throw error;
        }
    }
};

module.exports = { produtoModel }; //EXPORTANDO