exports.up = function(knex) {

    return knex.schema.createTable('estabelecimento', function (table) {
        table.increments('id').primary();        
        table.string('cnpj'         , 20 ).notNullable();
        table.string('razao'        , 200).notNullable();
        table.string('fantasia'     , 200).notNullable();
        table.string('cep'          , 9  ).notNullable();
        table.string('endereco'     , 200).notNullable();
        table.string('numero'       , 30 ).notNullable();
        table.string('complemento'  , 30 ).notNullable();
        table.string('uf'           , 2  ).notNullable();
        table.string('cidade'       , 160).notNullable();
        table.string('bairro'       , 160).notNullable();
        table.string('fone'         , 30 ).notNullable();
        table.string('email'        , 30 ).notNullable();        
        table.boolean('ativo');
        // Chave estrangeira da tabela usuário.
        table.integer('cadastrador').unsigned().notNullable();
        table.foreign('cadastrador').references('id').inTable('usuario');
       
    });  
 
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('estabelecimento');  
};