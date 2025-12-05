const {produtoModel} = require ("../model/produtoModel");
const produtoController ={
     /**
     * Controlador que lista produto do banco de dados
     */
    listarProduto: async (req, res) => {
       try {

            const { idProduto } = req.query;

            if (idProduto) {
                if (idProduto.length != 36) {
                    return res.status(400).json({ erro: `Id do Produto é inválido` })
                }

                const produto = await produtoModel.buscarUm(idProduto);
                return res.status(200).json(produto);

            }

            const produtos = await produtoModel.buscarTodos(); //Função buscarTodos leva para const produtos

            res.status(200).json(produtos)

        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            res.status(500).json({ error: `Erro interno no servidor ao buscar produtos.` })
        }
    },
    
    criarProduto: async( req, res)=>{
        try {
            const {nomeProduto, precoProduto} = req.body;

            if (nomeProduto== undefined ||!nomeProduto || nomeProduto.trim() === "" || !precoProduto ||precoProduto== undefined || precoProduto.trim() === ""|| isNaN(precoProduto)) {

                return res.status(400).json({ erro: "Campos obrigatórios não preenchidos" });
            } 
            await produtoModel.inserirProduto(nomeProduto,precoProduto);
            res.status(201).json({message: "Produto cadastrado com sucesso no Banco de Bados MySQL!"});         
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            res.status(500).json({ error: `Erro ao buscar produtos.` })
            
        }
    },
    atualizarProduto: async(req,res)=>{
        try {
            const {idProduto} = req.params; //será em query params para colocar a rota ID
            const {nomeProduto, precoProduto}=req.body;
            if(idProduto.length!=36){
                return res.status(400).json({erro:`ID do produto inválido.`})
            } 
            const produto = await produtoModel.buscarUm(idProduto);

            if(!produto || produto.length !==1){
                return res.status(404).json({ erro: `Produto não encontrado!`})
            }
            const produtoAtual = produto[0];
            const nomeAtualizado = nomeProduto??produtoAtual.nomeProduto;
            const precoAtualizado = precoAtualizado??produtoAtual.precoProduto;
            await produtoModel.atualizarproduto(idProduto,nomeAtualizado,precoAtualizado);
            res.status(200).json({message:"Produto atualizado com sucesso!"});

        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            res.status(500).json({ error: `Erro ao atualizar produtos.` });
            
        }

    },
    
    deletarProduto: async(req,res)=>{
        try {
            const {idProduto}=req.params;
            if(idProduto.length!=36){
                return res.status(400).json({erro: `ID do produto inválido!`});
            }
            const produto =await produtoModel.buscarUm(idProduto);
            
            if (!produto || produto.length !== 1) {
                return res.status(404).json({ erro: "Produto não encontrado" });
            }
            await produtoModel.deletarProduto(idProduto);
            res.status(200).json({message:`Produto deletado com sucesso.`});

            
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            res.status(500).json({ error: `Erro ao deletar produtos.` });
            
            
        }
    }

};
module.exports = { produtoController};