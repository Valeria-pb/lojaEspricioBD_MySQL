const jwt = require("jsonwebtoken");

const verify = {
    cliente: async(req, res, next) =>{
        try {
            const {token} = req.cookies;
            console.log(req.cookies);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            
            if(!decoded.tipoUsuario || decoded.tipoUsuario!=="cliente"){
                return res.status(403).json({erro: "acesso permitido somente para clientes!"});
            }
            next();
            
        } catch (error) {
            console.log(error);
            return res.status(401).json({erro: "Token inválido ou expirado!"});
            
        }
    }

}

module.exports = {verify};