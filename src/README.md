# Mini projeto rede social - Insta

## O que o usuario pode fazer?

- Fazer login
- Fazer cadastro
- Ver dados do seu perfil
- Editar dados do seu perfil(atualizar cadastro)
- Ver postagens de outros perfis
    - Ver quantidade de curtidas em uma postagem
    - Ver comentarios de uma postagem
- Curtir postagens de terceiros
- Comentar postagens

## O que não será possivel fazer

- Ver a localização de uma postagem
-  Ver pessoas que curtiram uma postagem
-  Curtir um comentario
-  comentar em outro comentario 

## Endpoints

### POST - login

#### Dados enviados
- username
- senha

#### Dados retornados
- sucesso / erro
- token

#### Objetivos gerais
- validar username
- validar senha
- buscar o usuario no banco de dados pelo campo unico(usernane ou id)
- verificar a se a senha esta correta
- gerando o token de autenticação
- retornar os dados do usuario e o token
- 

---
### POST - Cadastro

#### Dados enviados
- username
- senha

#### Dados retornados
- sucesso / erro

#### Objetivos gerais
- validar username
- validar senha
- verificar se o usuario(username) ja existe no BD
- criptografar a senha e salvar no BD
- cadastrar o usuario
- retornar sucesso ou erro

---
## GET - perfil(EXIBIR)

#### Dados enviados
- token (tera ID ou username)

#### Dados retornados
- url da foto
- nome
- username
- site
- bio
- email
- telefone
- genero

#### Objetivos gerais
- validar o tokem no headers(cabeçalho da requisição)
- buscar o cadastro do usuario através das informações do token (id ou username)
- retornar os dados do usuario
---
### PUT - Perfil (atualizar)

#### Dados enviados
- token (tera ID ou username)
- url da foto
- bome
- username
- site
- bio
- email
- telefone
- genero
- Senha

#### Dados retornados
- sucesso / erro

#### Objetivos gerais
- validar o tokem no headers(cabeçalho da requisição)
- - buscar o cadastro do usuario através das informações do token (id ou username)
- exigir ao menos um campo para atualizar
- criptografar a senha caso seja informada
- se email ou username, verificar se ja existe cadastro no BD
- atualizar o registro do usuario no BD
- retornar sucesso ou erro
---

### GET - Postagens


#### Dados enviados
- token
- ofsset

#### Dados retornados
- Postagens[array de postagens];
    - id
    - texto
    - foi curtido por mim
    - usuario
        - url da foto
        - username
        - é perfil oficial
    - fotos[array de fotos];
    - qtd curtidas
    - comentarios[array de comentarios]
        - username
        - texto

    - data

#### Objetivos gerais
- validar o tokem no headers(cabeçalho da requisição)
- buscar o cadastro do usuario através das informações do token (id ou username)
- retornar postagens de outras pessoas

---
### POST - Postagens


#### Dados enviados
- token
- texto
- array com fotos

#### Dados retornados
- sucesso / erro

#### Objetivos gerais
- validar o tokem no headers(cabeçalho da requisição)
- buscar o cadastro do usuario através das informações do token (id ou username)
- exigir que seja informado ao menos uma foto no array
- cadastrar postagem para o usuario logado
- cadastrar as fostos da postagem
- retornar sucesso ou erro

### POST curtir

#### Dados enviados
- token (id ou username)
- id da postagem

#### Dados retornados
- sucesso / erro

#### Objetivos gerais
- validar o token do usuario
- buscar o cadastro do usuario através das informações do token (id ou username)
- buscar o cadastro da postagem com o id informado
- verificar se o usuario ja curtiu a postagem
- cadastrar curtida da postagem no banco de dados
- retornar sucesso ou erro

### GET - Postagens


#### Dados enviados
- token
- ofsset

#### Dados retornados
- Postagens[array de postagens];
    - id
    - texto
    - foi curtido por mim
    - usuario
        - url da foto
        - username
        - é perfil oficial
    - fotos[array de fotos];
    - qtd curtidas
    - comentarios[array de comentarios]
        - username
        - texto

    - data

#### Objetivos gerais
- validar o tokem no headers(cabeçalho da requisição)
- buscar o cadastro do usuario através das informações do token (id ou username)
- buscar a postagem atraves do id informado
- verificar se o usuario ja curtiu a postagem
- cadastrar a curtida da postagem no 
- retornar sucesso /erro

---
### POST Comentar

#### Dados enviados
- token (id ou username)
- id comentario
- texto

#### Dados retornados
- sucesso / erro

#### Objetivos gerais
- validar o tokem no headers(cabeçalho da requisição)
- buscar o cadastro do usuario através das informações do token (id ou username)
- validar o texto
- buscar a postagem através do id informado
- cadastrar comentario no BD
- retornar sucesso ou erro