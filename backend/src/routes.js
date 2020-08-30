const express                   = require("express");

// Controles de Usuário
const UsuarioController         = require('./controller/usuarioController');
// Controles de Estabelecimento
const EstabelecimentoController = require('./controller/estabelecimentoController');

//Instancia do express
const routes = express.Router();

// Rotass de Login, Registro e esqueci minha senha
routes.post('/api/login'        , UsuarioController.login   ); // Login no sistema
routes.post('/api/registro'     , UsuarioController.registro); // Registro de novo usuário
routes.post('/api/esqueci'      , UsuarioController.esqueci ); // Esqueci a senha usuário

// Rotas Usuario  
routes.get('/api/usuario'       , UsuarioController.all     ); // Lista Todos
routes.get('/api/tecnico/:id'   , UsuarioController.getId   ); // Lista Usuário Por ID
routes.post('/api/usuario'      , UsuarioController.create  ); // Cria novo usuário
routes.put('/api/usuario/:id'   , UsuarioController.update  ); // Altera usuario
routes.delete('/api/usuario/:id', UsuarioController.delete  ); // Excluir usuário

// Rotas Usuario  
routes.get('/api/estabelecimento'       , EstabelecimentoController.all     ); // Lista Todos
routes.get('/api/estabelecimento/:id'   , EstabelecimentoController.getId   ); // Lista Usuário Por ID
routes.post('/api/estabelecimento'      , EstabelecimentoController.create  ); // Cria novo usuário
routes.put('/api/estabelecimento/:id'   , EstabelecimentoController.update  ); // Altera usuario
routes.delete('/api/estabelecimento/:id', EstabelecimentoController.delete  ); // Excluir usuário

//Exporta o módulo
module.exports = routes;