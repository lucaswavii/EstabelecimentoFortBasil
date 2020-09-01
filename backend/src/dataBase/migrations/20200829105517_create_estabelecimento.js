exports.up = function(knex) {

    return knex.schema.createTable('estabelecimento', function (table) {
        table.increments('id').primary();        
        table.string('cnpj'         , 20 ).notNullable();
        table.string('razao'        , 200).notNullable();
        table.string('fantasia'     , 200).notNullable();
        table.string('cep'          , 9  );
        table.string('endereco'     , 200);
        table.string('numero'       , 30 );
        table.string('complemento'  , 200);
        table.string('uf'           , 2  );
        table.string('cidade'       , 160);
        table.string('bairro'       , 160);
        table.string('fone'         , 30 );
        table.string('email'        , 160);        
        table.boolean('ativo');
        // Chave estrangeira da tabela usuário.
        table.integer('cadastrador').unsigned().notNullable();
        table.foreign('cadastrador').references('id').inTable('usuario');
       
    });  
 
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('estabelecimento');  
};