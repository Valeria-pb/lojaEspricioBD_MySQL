const mysql = require ('mysql2/promise');// importação da biblioteca mysql2

//configurações de conexão
const config ={
    host: "localhost",
    user: "root",
    password: "",//senha padrão do XAMPP é vazia
    database: "lojaEspricio",
    port: 3306,//porta padrão do MySQL
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit : 0
};
let pool;

/**
 * Cria ou retorna um pool de conexões com o banco de dados
 * 
 * Esta função segue um padrão SINGLETON: (EXPLICAÇÃO)
 * 1- Na primeira vez que for chamada, ela cria um pool e testa a conexão.
 * 2. Em todas as chamadas seguintes, ela retorna o pool já existente.
 * 
 * @async
 * @function getConnection
 * @returns {Promise<object>} retorna o objeto de pool com o banco de dados
 * @throws mostra no console e reverbera o erro se a caonexão falhar
 */
async function getConnection(){ 

    if (pool){
        return pool; // se o pool existe, retorna-o imediatamente.
    }

    try { //Se o pool não existe, ele é criado.

        console.log("Criando um novo pool de conexões MySQL...");

        pool = mysql.createPool(config);

        await pool.query("SELECT 1"); // aguarda realizar a conexão
        console.log("Pool de conexões MySQL criado com sucesso!");
        return pool; // retorna a conexão quando ela acontecer

    } catch (error) {
        console.error(`Erro na conexão com o MySQL `, error);
        
        pool = undefined; //Limpa o 'pool' que falhou para permitir uma nova tentativa (se aplicável)
        throw error;// // Reverbera o erro para que a aplicação que chamou saiba que falhou
    }
   
};
module.exports ={getConnection}; // exportando a função