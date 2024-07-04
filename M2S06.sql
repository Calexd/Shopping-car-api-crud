-- 1 - Crie uma tabela chamada clients com os seguintes campos:

-- id serial auto incremento;
-- name varchar(150) not null;
-- email varchar(150) unique not null;
-- cpf varchar(50) unique not null;
-- contact varchar(20) not null;


CREATE TABLE clients (
	id SERIAL primary key,
	name VARCHAR(150) NOT NULL,
	email VARCHAR(50) UNIQUE NOT NULL,
	cpf VARCHAR(11) UNIQUE NOT NULL,
	contact VARCHAR(20) not null
)





--- --------------------  [M2S06] - Ex. 03 - Cadastro de produto --------------------



-- >>>>>>>>> ETAPA 1
-- 1 - Crie uma tabela chamada categories com os seguintes campos:

-- id serial auto incremento;
-- name varchar(150) NOT NULL;
-- Crie um script SQL inserindo 10 categorias no banco de dados.

CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL
)


INSERT INTO categories (name) 
VALUES ('Eletrônicos'),
('Móveis'),
('Roupas'),
('Livros'),
('Brinquedos'),
('Alimentos'),
('Esportes'),
('Beleza'),
('Automotivo'),
('Música');


-- >>>>>>>>> ETAPA 2
-- Crie uma tabela chamada products com os seguintes campos:
-- id serial auto incremento;
-- name varchar(150) NOT NULL;
-- amount varchar(150) unique default 0;
-- color varchar(50)
-- voltage ENUM (110 ou 220)
-- description TEXT
-- category_id fk NOT NULL



CREATE TABLE products (
	id  SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	amount VARCHAR(150) UNIQUE DEFAULT 0,
	color VARCHAR(50),
	voltage VARCHAR(3) CHECK (voltage IN ('110', '220')),
	description TEXT,
	category_id INT NOT NULL,
	FOREIGN KEY (category_id) REFERENCES categories(id)
	)