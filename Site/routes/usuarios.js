// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

// router.post('/entrar', function (req, res, next) {

//   banco.conectar().then(() => {
//     console.log(`Chegou p/ login: ${JSON.stringify(req.body)}`);
//     var login = req.body.login; // depois de .body, use o nome (name) do campo em seu formulário de login
//     var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login
//     if (login == undefined || senha == undefined) {
//       throw new Error(`Dados de login não chegaram completos: ${login} / ${senha}`);
//     }
//     return banco.sql.query(`select * from Usuarios where login='${login}' and senha='${senha}'`);
//   }).then(consulta => {

//     console.log(`Usuários encontrados: ${JSON.stringify(consulta.recordset)}`);

//     if (consulta.recordset.length==1) {
//       res.send(consulta.recordset[0]);
//     } else {
//       res.sendStatus(404);
//     }

//   }).catch(err => {

//     var erro = `Erro no login: ${err}`;
//     console.error(erro);
//     res.status(500).send(erro);

//   }).finally(() => {
//     banco.sql.close();
//   });

// });
router.post('/cadastrar', function (req, res, next) {

  var nome,sobrenome, email, data, sexo,perg, resp;
  var senha;
  var cadastro_valido = false;

  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);
	nome = req.body.nome; // depois de .body, use o nome (name) do campo em seu formulário de login
    nome = req.body.nome; // depois de .body, use o nome (name) do campo em seu formulário de login
    sobrenome = req.body.sobrenome;
    email = req.body.email;
    data = req.body.dtNasc;
    sexo = req.body.genero;
    perg = req.body.PegSecreta;
    resp = req.body.respSecreta;
    senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login
    if (login == undefined || senha == undefined || nome == undefined) {
	  // coloque a frase de erro que quiser aqui. Ela vai aparecer no formulário de cadastro
      throw new Error(`Dados de cadastro não chegaram completos: ${email} / ${senha} / ${nome}`);
    }
    return banco.sql.query(`select count(*) as contagem from usuario where email = '${email}'`);
  }).then(consulta => {

	if (consulta.recordset[0].contagem >= 1) {
		res.status(400).send(`Já existe usuário com o E-mail "${email}"`);
		return;
    } else {
		console.log('válido!');
		cadastro_valido = true;
	}

  }).catch(err => {

    var erro = `Erro no cadastro: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
	  if (cadastro_valido) {		  
			  
		banco.sql.query(`insert into Usuarios (nome,sobrenome, email, datanasc, sexo,pergunta, resposta, senha) values ('${nome}','${sobrenome}','${email}','${data}','${sexo}','${perg}','${resp}','${senha}')`).then(function() {
			console.log(`Cadastro criado com sucesso!`);
			res.sendStatus(201); 
			// status 201 significa que algo foi criado no back-end, 
				// no caso, um registro de usuário ;)		
		}).catch(err => {

			var erro = `Erro no cadastro: ${err}`;
			console.error(erro);
			res.status(500).send(erro);

		}).finally(() => {
			banco.sql.close();
		});
	  }
  });
  

});


// não mexa nesta linha!
module.exports = router;