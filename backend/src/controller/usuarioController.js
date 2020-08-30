const crypto = require('crypto');
const connection  = require('../database/connection');
const validador   = require('../component/Token');

module.exports = {

    async create(request, response) {
            
        const x_access_token = request.headers['x-access-token'];
        
        if (!x_access_token) return response.status(401).json('Toke não informado.');
        
        const token = validador.ValidaToken(x_access_token);
        
        try {
        
            const { email, senha, ativo } = request.body;
           
                
            const [id] = await connection('usuario').insert({
                email,
                senha:crypto.createHash("md5").update(senha).digest("hex"),
                ativo,
             });

            return response.json({id});
                
        } catch (error) {
            return response.status(401).json('Token inválido.');
        }
    },
    async update(request, response) {
        const x_access_token = request.headers['x-access-token'];
        
        if (!x_access_token) return response.status(401).json('Toke não informado.');
        const token = validador.ValidaToken(x_access_token);
        
        try {
        
            const { email, senha, ativo } = request.body;
    
            const { id } = request.params;
            
            await connection('usuario').update({
                email,
                senha:crypto.createHash("md5").update(senha).digest("hex"),
                ativo,
            }).where('id', id);
            
            return response.json({id});
            
        } catch (error) {
            return response.status(401).json(error);
        }
    },
    async delete(request, response) {

        const x_access_token = request.headers['x-access-token'];
        const { id } = request.params;
        
        if (!x_access_token) return response.status(401).json({ auth: false, message: 'Toke não informado.' });
        const token = validador.ValidaToken(x_access_token);
        if (!id) return response.status(401).json('Id não informado.');
        
        try {        
            await connection('usuario').where('id', id).delete();
            return response.status(204).send();       
        } catch (error) {
            return response.status(401).json(error);    
        }
    },
    async all(request, response) {
        const x_access_token = request.headers['x-access-token'];
        
        if (!x_access_token ) return response.status(401).json('Token não informado.');
        const token = validador.ValidaToken(x_access_token);                 
        
        try {
            
            const usuarios = await connection('usuario')
            .select('*').orderBy('usuario.id');
            
            return response.json(usuarios);
        
        } catch (error) {
            return response.status(401).json({ auth: false, message: 'Token inválido.' });
        }
    },
    async getId(request, response) {
      
        const x_access_token = request.headers['x-access-token'];
        const { id } = request.params;
        
        if (!x_access_token ) return response.status(401).json({ auth: false, message: 'Token não informado.' });
        const token = validador.ValidaToken(x_access_token);                 
        if (!id ) return response.status(401).json('Id não informado.');
        
        try {
            const usuarios = await connection("usuario")
            .where('id', id)
            .select('*')
            .first();
    
            return response.json(usuarios);

        } catch (error) {
            return response.status(401).json({ auth: false, message: 'Token inválido.' });    
        }
        
    },
    async login(request, response) {
        
        const { email, senha } = request.body;
        
        if (!email ) return  response.status(401).json('Informe o usuario.');
        if (!senha ) return response.status(401).json('Informe a senha.');
        
        try {
            const usuarios = await connection('usuario')
            .limit(1)         
            .where('usuario.email', nome)
            .andWhere("usuario.senha", crypto.createHash("md5").update(senha).digest("hex"))            
            .select('*')
            .first();
                
            if ( usuarios.length == 0) return response.status(401).json('Usuário ou Senha Inválidos!');
            
            const token = validador.criarToken(usuarios[0]);
            
            // Incluir token no retorno do usuario
            usuarios.token = token;
            
            return response.json(usuarios);
        
        } catch (error) {
            return response.json(error);
        }    
    },
    async registro(request, response) {
        
        
        const { email, senha } = request.body;
        
        if (!email ) return response.status(401).json('Informe o Nome.');
        if (!senha ) return response.status(401).json('Informe a senha.');
 
        try {

            const usuarios = await connection('usuario')
            .limit(1)         
            .where('usuario.email', email)
            .select('*');

            if ( usuarios.length > 0 ) return response.status(401).json('Usuário possui acesso ao sistema.');
            
            const usuario  = await connection('usuario').insert({ 
                email, 
                senha:crypto.createHash("md5").update(senha).digest("hex"), 
                ativo:true
            });
             
            return response.json('Usuário cadastrado com sucesso.');
            
        } catch (error) {
            return response.status(401).json('Ocorreu um erro ao tentar cadastrar novo usuário.');
        }               
    },
    async esqueci(request, response) {
        
        const { email } = request.body;
        
        if (!email ) return response.status(401).json('Informe o Nome.');
        
        try {

            const usuarios = await connection('usuario')
            .limit(1)         
            .where('usuario.email', email)
            .select('*');

            if ( usuarios.length == 0 ) return response.status(401).json('Não foi encontrado nenhum usuario com o email informado.');
            
             
            return response.json(usuarios);
            
        } catch (error) {
            return response.status(401).json('Ocorreu um erro ao tentar lembrar sua senha de usuário.');
        }               
    }      
}