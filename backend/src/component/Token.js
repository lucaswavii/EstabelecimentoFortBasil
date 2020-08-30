var jwt = require('jsonwebtoken');
const segredo = { 'secret': '072366b08b7c75b65d02091690a0805e' }

module.exports = {
    
    // Valida se o TOKEN informado ainda está ativo
    ValidaToken( token ) {        
        if (!token) return { auth: false, token: null, message: 'Failed to authenticate token.' };     
        return jwt.verify(token, segredo );        
    },

    // Cria TOKEN de acesso
    criarToken(usuario) {
        // expires in 24 hours
        return jwt.sign({ user: usuario },  segredo, { expiresIn: 86400 });      
    }
};
