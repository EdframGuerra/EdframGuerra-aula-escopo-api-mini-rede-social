DROP TABLE IF EXISTS postagens_curtidas;

DROP TABLE IF EXISTS postagens_comentarios;

DROP TABLE IF EXISTS postagens_fotos;

DROP TABLE IF EXISTS postagens;

DROP TABLE IF EXISTS usuarios;

-- banco de dados da rede social
CREATE DATABASE mini_rede_social;

-- usuarios da rede social
CREATE TABLE usuarios(
  ID serial PRIMARY KEY,
  nome text,
  imagem text,
  username text NOT NULL UNIQUE,
  email text UNIQUE,
  site text,
  bio text,
  telefone text,
  genero text,
  senha text NOT NULL,
  verificado boolean default false
);

-- tabela de postagens
CREATE TABLE postagens(
  ID serial PRIMARY KEY,
  usuario_id int not null REFERENCES usuarios(ID),
  data timestamptz default now(),
  texto text
);

-- tabela de fotos das postagens
CREATE TABLE postagens_fotos(
  ID serial PRIMARY KEY,
  postagens_id int NOT NULL REFERENCES postagens(ID),
  imagem text NOT NULL
);

-- tabela de comentarios das postagens
CREATE TABLE postagens_comentarios(
  ID serial PRIMARY KEY,
  texto text NOT NULL,
  data timestamptz default now(),
  postagens_id int NOT NULL REFERENCES postagens(ID),
  usuario_id int not null REFERENCES usuarios(ID)  
);

-- tabela de curtidas daspostagens
CREATE TABLE postagens_curtidas(
  usuario_id int NOT NULL REFERENCES usuarios(ID),
  postagem_id int NOT NULL REFERENCES postagens(ID),  
  data timestamptz default now()
);