
exports.up = function(knex) {

    return knex.schema.createTable('usuario', function (table) {
        table.increments('id').primary();        
        table.string('email', 200).notNullable();
        table.string('senha', 200).notNullable();
        table.boolean('ativo')
        
    });  
 
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuario');  
};
