const knex = require('../conexao-banco-dados/conexao')

const postagemNova = async (req, res) => {
    const { id } = req.usuario
    const { texto, fotos } = req.body

    if (!fotos || fotos.length === 0) {
        return res.status(404).json({ mensagem: 'A postagem deve ter uma foto' })
    }

    try {
        const postagem = await knex('postagens').insert({ usuario_id: id, texto }).returning('*')

        if (!postagem) {
            return res.status(400).json({ mensagem: 'Não foi possível criar a postagem' })
        }
        fotos.forEach(foto => {
            foto.postagens_id = postagem[0].id
        });
        const fotoPostagem = await knex('postagens_fotos').insert(fotos)

        if (!fotoPostagem) {
            await knex('postagens').where({ id: postagem[0].id }).del()

            return res.status(400).json({ mensagem: 'Não foi possível criar a postagem' })
        }
        return res.status(200).json({ mensagem: 'Postagem criada com sucesso' })

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }

}

const curtirPostagem = async (req, res) => {
    const { id } = req.usuario

    const { postagemId } = req.params

    try {
        const postagem = await knex('postagens').where({ id: postagemId }).first()

        if (!postagem) {
            return res.status(404).json({ mensagem: 'Postagem não encontrada' })
        }

        const jaCurtiu = await knex('postagens_curtidas').where({ postagem_id: postagem.id, usuario_id: id }).first()

        if (jaCurtiu) {
            return res.status(400).json({ mensagem: 'Postagem já curtida' })
        }

        const curtida = await knex('postagens_curtidas').insert({ postagem_id: postagem.id, usuario_id: id }).returning('*')

        if (!curtida) {

        }

        return res.status(200).json({ mensagem: 'Postagem curtida com sucesso' })

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const comentarPostagem = async (req, res) => {
    const { id } = req.usuario
    const { texto } = req.body
    const { postagemId } = req.params

    if (!texto) {
        return res.status(404).json({ mensagem: 'O comentário deve ter um texto' })
    }

    try {
        const postagem = await knex('postagens').where({ id: postagemId }).first()

        if (!postagem) {
            return res.status(404).json({ mensagem: 'Postagem não encontrada' })
        }

        const comentario = await knex('postagens_comentarios').insert({ postagens_id: postagem.id, usuario_id: id, texto })

        if (!comentario) {
            return res.status(400).json({ mensagem: 'Não foi possível comentar a postagem' })
        }

        return res.status(200).json({ mensagem: 'Comentario postado com sucesso' })

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const feed = async (req, res) => {
    const { id } = req.usuario
    const { offset } = req.query

    const paginacao = offset ? offset : 0

    try {
        const postagens = await knex('postagens').where('usuario_id', '!=', id).limit(10).offset(paginacao)

        if (postagens.length === 0) {
            return res.status(200).json(postagens)
        }

        for(let item of postagens){
            const usuario = await knex('usuarios').where({ id: item.usuario_id }).select('imagem', 'username', 'verificado').first()
            item.usuario = usuario

            const fotos = await knex('postagens_fotos').where({ postagens_id: item.id }).select('imagem')
            item.fotos = fotos

            const comentarios = await knex('postagens_comentarios').leftJoin('usuarios', 'usuarios.id', 'postagens_comentarios.usuario_id').where({ postagens_id: item.id }).select('usuarios.username', 'postagens_comentarios.texto')
            item.comentarios = comentarios

            const curtidas = await knex('postagens_curtidas').where({ postagem_id: item.id }).select(usuario.id)
            item.curtidoPorMim = curtidas.find(curtida => curtida.usuario_id === id) ? true : false
            item.curtidas = curtidas.length
        }
        
        return res.status(200).json(postagens)

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }

}

module.exports = {
    postagemNova,
    curtirPostagem,
    comentarPostagem,
    feed
}