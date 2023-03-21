const knex = require('../conexao-banco-dados/conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaHash = require('../senhaHash')


const login = async (req, res) => {
    const { username, senha } = req.body

    if (!username || !senha) {
        return res.status(400).json('Preencher todos os campos obrigatórios')
    }

    try {
        const usuario = await knex('usuarios').where({ username }).first()

        if (!usuario) {
            return res.status(400).json('Usuário não cadastrado')
        }

        const SenhaAutenticada = await bcrypt.compare(senha, usuario.senha)

        if (!SenhaAutenticada) {
            return res.status(400).json({ mensagem: 'Usuário e/ou senha inválido(s).' })
        }

        const token = jwt.sign({ id: usuario.id, username: usuario.username }, senhaHash, { expiresIn: '24h' })

        const { senha: _, ...usuarioAutenticado } = usuario


        return res.status(200).json({ usuario: usuarioAutenticado, token })

    } catch (error) {
        return res.status(500).json(error.message)
    }

}



module.exports = {
    login
}