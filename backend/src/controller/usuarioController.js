const crypto = require('crypto');
const connection  = require('../database/connection');
const validador   = require('../component/Token');

module.exports = {

    async create(request, response) {
            
        const x_access_token = request.headers['x-access-token'];
        
        if (!x_access_token ) return response.status(401).json({success: false, error:'Serviço não autorizado.'});
    
        const token = validador.ValidaToken(x_access_token);
        
        try {
        
            const { email, senha, ativo } = request.body;
           
            if (!email ) return  response.status(401).json({success: false, error:'Informe o e-mail.'});
            if (!senha ) return response.status(401).json({success: false, error:'Informe a senha.'});
                
            const [id] = await connection('usuario').insert({
                email,
                senha:crypto.createHash("md5").update(senha).digest("hex"),
                ativo: ativo ? ativo : false,
             });

            return response.status(200).json({success: true, error:''});
                
        } catch (error) {
            return response.status(401).json('Token inválido.');
        }
    },
    async update(request, response) {
        const x_access_token = request.headers['x-access-token'];
        
        if (!x_access_token ) return response.status(401).json({success: false, error:'Serviço não autorizado.'});
        const token = validador.ValidaToken(x_access_token);
        
        try {
        
            const { email, senha, ativo } = request.body;
    
            if (!email ) return  response.status(401).json({success: false, error:'Informe o e-mail.'});
            if (!senha ) return response.status(401).json({success: false, error:'Informe a senha.'});
           
            const { id } = request.params;
            
            await connection('usuario').update({
                email,
                senha:crypto.createHash("md5").update(senha).digest("hex"),
                ativo: ativo ? ativo : false,
            }).where('id', id);
            
            return response.status(200).json({success: true, error:''});
            
        } catch (error) {
            return response.status(500).json({success: false, error:'Ocorreu um erro inesperado no servidor.'});
        }
    },
    async delete(request, response) {

        const x_access_token = request.headers['x-access-token'];
        
        const { id } = request.params;
        
        if (!x_access_token ) return response.status(401).json({success: false, error:'Serviço não autorizado.'});
        
        
        if (!id) return response.status(401).json({success: false, error:'Informe o ID para deletar.'});
        
        try {        
            
            const token = validador.ValidaToken(x_access_token);
            
            await connection('usuario')
            .where('id', id)
            .delete();
            
            return response.status(204).json({success: true, error:'Excluído com sucesso.'});       
        } catch (error) {
            return response.status(500).json({success: false, error:'Ocorreu um erro inesperado.'});    
        }
    },
    async all(request, response) {
        
        const x_access_token = request.headers['x-access-token'];
        
        if (!x_access_token ) return response.status(401).json({success: false, error:'Serviço não autorizado.'});
        
        
        try {
            
            const token = validador.ValidaToken(x_access_token);                 
            
            const usuarios = await connection('usuario')
            .select('*')
            .orderBy('usuario.id');
            
            return response.status(200).json({data:usuarios, success: true, error:''});
        
        } catch (error) {
            return response.status(401).json({success: false, error:'Ocorreu um erro inesperado no servidor.'});
        }
    },
    async getId(request, response) {
      
        const x_access_token = request.headers['x-access-token'];
        
        const { id } = request.params;
        
        if (!x_access_token ) return response.status(401).json({success: false, error:'Serviço não autorizado.'});
        
        const token = validador.ValidaToken(x_access_token);                 

        if (!id ) return response.status(401).json({success: false, error:'Informe o ID do usuário.'});
        
        try {
            const usuarios = await connection("usuario")
            .where('id', id)
            .select('*');
    
            return response.json(usuarios);

        } catch (error) {
            return response.status(500).json({success: false, error:'Ocorreu um erro inesperado no servidor.'});    
        }
        
    },
    async login(request, response) {
        
        const { email, senha } = request.body;
        
        if (!email ) return  response.status(401).json({success: false, error:'Informe o e-mail.'});
        if (!senha ) return response.status(401).json({success: false, error:'Informe a senha.'});
        
        try {
            const usuarios = await connection('usuario')
            .limit(1)         
            .where('usuario.email', email)
            .andWhere("usuario.senha", crypto.createHash("md5").update(senha).digest("hex"))            
            .select('*');
                
            if ( usuarios.length == 0) return response.status(401).json({success: false, error:'Usuário ou Senha Inválidos!'});
            
            const token = validador.criarToken(usuarios[0]);
            
            // Incluir token no retorno do usuario
            usuarios[0].token = token;
            
            return response.json(usuarios);
        
        } catch (error) {
            console.log(error)
            return response.status(401).json({success: false, error:'Ocorreu um erro inesperado no servidor'});
        }    
    },
    async registro(request, response) {
        
        
        const { email, senha } = request.body;
        
        if (!email ) return response.status(401).json({success: false, error:'Informe o e-mail para registro.'});
        if (!senha ) return response.status(401).json({success: false, error:'Informe a senha para registro.'});
 
        try {

            const usuarios = await connection('usuario')
            .limit(1)         
            .where('usuario.email', email)
            .select('*');

            if ( usuarios.length > 0 ) return response.status(401).json({success: false, error:`O usuário ${ email} já registrado.`});
            
            const usuario  = await connection('usuario').insert({ 
                email, 
                senha:crypto.createHash("md5").update(senha).digest("hex"), 
                ativo:true
            });
             
            return response.status(200).json({data:usuario, success: true, error:'Usuário cadastrado com sucesso!'});
            
        } catch (error) {
            return response.status(500).json({data:[], success: false, error:'Ocorreu um erro inesperado no servidor.'});
        }               
    },
    async esqueci(request, response) {
        
        const { email } = request.body;
        
        if (!email ) return response.status(400).json({success: false, error:'Informe o e-mail'});
        
        try {

            const usuarios = await connection('usuario')
            .limit(1)         
            .where('usuario.email', email)
            .select('*');

            if ( usuarios.length == 0 ) return response.status(400).json({success: false, error:`O usuário ${ email} não encontrado.`});
            
             
            return response.status(200).json({data:usuarios, success: false, error:''});
            
        } catch (error) {
            return response.status(500).json({success: false, error:`Ocorreu um erro inesperado. Error: ${ error }.`});
        }               
    }      
}