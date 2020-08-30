const connection  = require('../database/connection');
const validador   = require('../component/Token');

module.exports = {

    async create(request, response) {
        
        const x_access_token = request.headers['x-access-token'];
        
        if (!x_access_token) return response.status(401).json('Toke não informado.');
        
        try {
        
            const token = validador.ValidaToken(x_access_token);
        
            const { cnpj, razao, fantasia, cep, endereco, numero, complemento, uf, cidade, bairro, fone, email, ativo } = request.body;

            const [id] = await connection('estabelecimento').insert({
                cnpj, 
                razao, 
                fantasia, 
                cep, 
                endereco, 
                numero, 
                complemento, 
                uf, 
                cidade, 
                bairro, 
                fone, 
                email, 
                ativo
            });

            return response.json({id});

        } catch (error) {
            console.log(error)
            return response.status(501).json(error);    
        }
    },
    async update(request, response) {
        
        const x_access_token = request.headers['x-access-token'];
        
        if (!x_access_token) return response.status(401).json('Toke não informado.');
        
        const token = validador.ValidaToken(x_access_token);
        
        const { id } = request.params;
        if( !id ) response.status(401).json('Id não informado.')
        try {
            
            const { cnpj, razao, fantasia, cep, endereco, numero, complemento, uf, cidade, bairro, fone, email, ativo } = request.body;
         
            await connection('estabelecimento').update({    
                cnpj, 
                razao, 
                fantasia, 
                cep, 
                endereco, 
                numero, 
                complemento, 
                uf, 
                cidade, 
                bairro, 
                fone, 
                email, 
                ativo 
            }).where("id",id);
        
            return response.json({id});
                    
        } catch (error) {
            return response.status(501).json(error);    
        }
    },
    async delete(request, response) {

        const x_access_token = request.headers['x-access-token'];
        
        const { id } = request.params;
        
        if (!x_access_token) return response.status(401).json('Toke não informado.');
        const token = validador.ValidaToken(x_access_token);
        
        if( !id ) response.status(401).json('Id não informado.')
        
        try {
            await connection('estabelecimento').where('id', id).delete();
    
            return response.status(204).send();       
               
        } catch (error) {
            return response.status(501).json(error);    
        }
    },
    async all(request, response) {
        
        const x_access_token = request.headers['x-access-token'];

        if (!x_access_token) return response.status(401).json('Token não informado.');
        const token = validador.ValidaToken(x_access_token);
        
        try {
            
            const estabelecimentos = await connection("estabelecimento").select('*');
            
            return response.json(estabelecimentos);    
        } catch (error) {
            return response.status(501).json( error );    
        }
        
    },
    async getId(request, response) {
       
        const x_access_token = request.headers['x-access-token'];
        const { id } = request.params;
        
        if (!x_access_token) return response.status(401).json('Toke não informado.');
        if ( !id ) return response.status(401).json('Toke não informado.');
        
        const token = validador.ValidaToken(x_access_token);
        try {
            const estabelecimentos = await connection("estabelecimento")
            .where('id', id)
            .select('*')
            .first();

            return response.json(estabelecimentos);
        } catch (error) {
            return response.status(501).json(error);    
        }       
    }
}