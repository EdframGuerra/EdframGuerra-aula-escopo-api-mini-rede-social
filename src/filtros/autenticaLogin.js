const knex = require('../conexao-banco-dados/conexao')
const jwt = require('jsonwebtoken')
const senhaHash = require('../senhaHash')

const autenticaLogin = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json('Não autorizado!!!')
    }

    try {
        const token = authorization.replace('Bearer', '').trim()

        const { id } = jwt.verify(token, senhaHash)

        const usuarioExiste = await knex('usuarios').where({ id }).first()

        if (!usuarioExiste) {
            return res.status(404).json({ mensagem: 'Token invalido' })
        }

        const { senha, ...usuario } = usuarioExiste

        req.usuario = usuario

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = autenticaLogin