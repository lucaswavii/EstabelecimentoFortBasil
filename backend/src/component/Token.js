var jwt = require('jsonwebtoken');
const keySecret      = require('./secret');

module.exports = {
    
    // Valida se o TOKEN informado ainda está ativo
    ValidaToken( token ) {        
        if (!token) return { auth: false, token: null, message: 'Failed to authenticate token.' };     
        return jwt.verify(token, keySecret.Key_security );        
    },

    // Cria TOKEN de acesso
    criarToken(usuario) {
        // expires in 24 hours
        return jwt.sign({ user: usuario },  segredo.secret, { expiresIn: 86400 });      
    }
};
