const knex = require('knex');
const configuration = require('../../knexfile');
// Base Desenvolvimento
const connection_developer = knex(configuration.development);
// Base Homologação
const connection_homologacao = knex(configuration.staging);
// Base Produtção
const connection_producao = knex(configuration.production);

module.exports = connection_developer;