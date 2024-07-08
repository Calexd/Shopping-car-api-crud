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




--- --------------------  [M2S06] - Ex. 06 - Cadastro de carrinho --------------------



-- 	1 - Crie uma tabela chamada orders com os seguintes campos:

-- id serial auto incremento;
-- client_id FK;
-- total decimal (10,2);
-- address TEXT;
-- observations.


CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	client_id INT NOT NULL,
	total DECIMAL(10,2) NOT NULL,
	address TEXT,
	observations TEXT,
	FOREIGN KEY (client_id) REFERENCES clients(id) 
)


-- 2 - Crie uma tabela chamada orders_items com os seguintes campos:

-- id serial auto incremento;
-- order_id FK;
-- product_id (10,2);
-- amount TEXT;
-- price.




CREATE TABLE orders_items (
	id SERIAL PRIMARY KEY,
	order_id INT NOT NULL,
	product_id INT NOT NULL,
	amount INT NOT NULL CHECK (amount > 0),
	price DECIMAL (10,2) NOT NULL,
	CONSTRAINT fk_order_id  FOREIGN KEY (order_id) REFERENCES orders(id),
	CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products(id)
)




