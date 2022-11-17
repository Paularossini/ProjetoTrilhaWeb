CREATE DATABASE IF NOT EXISTS bdcoldigo DEFAULT CHARACTER SET utf8;
USE bdcoldigo;
CREATE TABLE IF NOT EXISTS marcas(
id int UNSIGNED NOT NULL AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS produtos(
id int(5) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
categoria VARCHAR(45) NOT NULL,
capacidade int(5) UNSIGNED NOT NULL,
valor DECIMAL(7,2) UNSIGNED NOT NULL,
marcas_id int UNSIGNED NOT NULL,
PRIMARY KEY (id),
INDEX fk_produtos_marcas_idx (marcas_id ASC),
CONSTRAINT fk_produtos_marcas
FOREIGN KEY (marcas_id)
REFERENCES marcas (id)
);
INSERT INTO `marcas` VALUES 
(1, 'Electrolux'),
(2, 'Brastemp'),
(3, 'Consul');
