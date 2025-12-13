const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
const {clienteModel}= require("../model/clienteModel");
const authController={
    clienteLogin: async (req, res) => {
        try {
            const {emailCliente, cpfCliente, senhaCliente} = req.body;

            if ((emailCliente == undefined && cpfCliente == undefined)|| senhaCliente == undefined){
                return res.status(400).json({erro: "Email ou CPF e senha são obrigatórios!"}); 
            }
            const result = await clienteModel.buscarEmailOrCPF(cpfCliente, emailCliente);
            if (result.length == 0){
                return res.status(401).json({erro: "Email ou CPF não encontrado"});
            }

            const cliente= result[0];

            const senhaValida = await bcrypt.compare(senhaCliente, cliente.senhaCliente);

            if(!senhaValida) {
                return res.status(401).json({erro:"senha invalida!"});
            }
            const payload ={
                idCliente: cliente.idCliente,
                nomeCliente: cliente.nomeCliente,
                tipoUsuario: "cliente"
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn: process.env.JWT_EXPIRES_IN
        });
            res.cookie("token", token,{
                httpOnly: true, 
                secure: true,
                sameSite: "strict",
                maxAge: Number(process.env.JWT_TIME_EXPIRES_IN)//esse serve como conf. para o cliente, entender mais depois

            });

            res.status(200).json({message: "Login realizado com sucesso!"});

        } catch (error) {
            console.error("Erro no Login do cliente", error);
            return res.status(500).json({erro: "Erro no servidor ao realizar login do cliente"});
        }
        
    }


};

module.exports = {authController};