Pacotes necessáros do Backend

//Instação do Express para tratamento request e response
* npm i express

// Instaçao Knex para trantamento de banco de dados( conexão, acesso, criação de tabelas e etc)
* npm i knex
    
    - Comandos básicos no knex
    
    * npx knex init
        Criação do arquivo de knex de conexão

    * npx knex migrate:make create_nome_da_tabela
        Cria migration para criação da tabela
 
    * npx knex migration:latest 
        Cria tabela no banco de dados
    
    * npx knex migration:rollback
        Desfaz a ultima migration ou atualização no banco.
 

// Instaçao mysql pacote de conexão mysql
* npm i mysql

// Instalação jsonwebtoken tranamento de token e json
* npm i jsonwebtoken

// Instalação Cors
* npm i cors
