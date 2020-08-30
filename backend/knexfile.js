// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : '3.218.56.54',
      user : 'root',
      password : 'Wa180279',
      database : 'dbEstabeleci_d'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault:true,
  },

  staging: {
    client: 'mysql',
    connection: {
      host : '3.218.56.54',
      user : 'root',
      password : 'Wa180279',
      database : 'dbEstabeleci_h'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault:true,
  },
  
  production: {
    client: 'mysql',
    connection: {
      host : '3.218.56.54',
      user : 'root',
      password : 'Wa180279',
      database : 'dbEstabeleci_p'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault:true,
  },

};
