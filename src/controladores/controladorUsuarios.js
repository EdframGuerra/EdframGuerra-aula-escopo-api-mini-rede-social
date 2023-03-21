const knex = require('../conexao-banco-dados/conexao')
const bcrypt = require('bcrypt')


const cadastroUsuario = async (req, res) => {
    const { username, senha } = req.body

    if (!username || !senha) {
        return res.status(400).json('Preencher todos os campos obrigatórios!')
    }
    if (senha.length < 6) {
        return res.status(400).json('Senha deve ter no mínimo 6 caracteres')
    }
    try {

        const usuarioExiste = await knex('usuarios').where({ username }).first()

        if (usuarioExiste) {
            return res.status(400).json('UserName já existe')
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const usuario = await knex('usuarios').insert({ username, senha: senhaCriptografada })

        if (!usuario) {
            return res.status(400).json('Não foi possível cadastrar o usuário')
        }

        return res.status(200).json({ mensagem: 'Usuário cadastrado com sucesso' })

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }

}

const perfilUsuario = async (req, res) => {
    return res.status(200).json(req.usuario)
}

const atualizarUsuario = async (req, res) => {
    let { nome, email, senha, imagem, username, site, bio, telefone, genero } = req.body

    const { id } = req.usuario

    if (!nome && !email && !senha && !imagem && !username && !site && !bio && !telefone && !!genero) {
        return res.status(400).json({ mensagem: 'O preenchimento de ao menos um campo é obrigatório' })
    }

    try {
        if (senha) {
            if (senha.length < 6) {
                return res.status(400).json({ mensagem: 'Senha deve ter no mínimo 6 caracteres' })
            }

            senha = await bcrypt.hash(senha, 10)
        }

        if (email !== req.usuario.email) {
            const emailExiste = await knex('usuarios').where({ email }).first()

            if (emailExiste) {
                return res.status(400).json({ mensagem: 'Email já existe!' })
            }
        }

        if (username !== req.usuario.username) {
            const usernameUsuarioExiste = await knex('usuarios').where({ username }).first()

            if (usernameUsuarioExiste) {
                return res.status(400).json({ mensagem: 'Username ja existe!' })
            }
        }

        const usuario = await knex('usuarios').update({ nome, email, senha, imagem, username, site, bio, telefone, genero }).where({ id })

        if (!usuario) {
            return res.status(400).json({ mensagem: 'Não foi possível atualizar o usuário' })
        }

        return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso' })


    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }

}

module.exports = {
    cadastroUsuario,
    perfilUsuario,
    atualizarUsuario
}