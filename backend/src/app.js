const express   = require("express");
const routes    = require('./routes');
const cors      = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);


/* CODE STATUS 
200 - OK (Processado normalmente)
201 - Created (Qualquer CRUD) 
202 - Accepted (Requisição aceita porem nao finalizado)
400 - Bad Request (Deu ruim)
401 - Unauthorized (Autenticação, carater temporario)
403 - Forbidden (Autorização, tem carater permanente)
404 - Not Found (Não tem o Endpoint)
500 - Internal Server error (Pau na API)
501 - Not Implemented - a API não suporta essa funcionalidade
503 - Service Unavailable (API executa essa operação, mas no momento está indisponível)
*/