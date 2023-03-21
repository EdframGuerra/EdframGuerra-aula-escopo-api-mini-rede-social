const express = require('express')
const { postagemNova, curtirPostagem, comentarPostagem, feed } = require('./controladores/controladorPostagem')
const { cadastroUsuario, perfilUsuario, atualizarUsuario } = require('./controladores/controladorUsuarios')
const { login } = require('./controladores/login')
const autenticaLogin = require('./filtros/autenticaLogin')


const rotas = express.Router()


rotas.post('/cadastro', cadastroUsuario)
rotas.post('/login', login)

rotas.use(autenticaLogin)

rotas.get('/perfil', perfilUsuario)
rotas.put('/perfil', atualizarUsuario)

rotas.post('/postagens', postagemNova)
rotas.get('/postagens',feed)
rotas.post('/postagens/:postagemId/curtir', curtirPostagem)
rotas.post('/postagens/:postagemId/comentar', comentarPostagem)

module.exports = rotas