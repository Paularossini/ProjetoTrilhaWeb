CREATE DATABASE IF NOT EXISTS bdcoldigo DEFAULT CHARACTER SET utf8;
USE bdcoldigo;
CREATE TABLE IF NOT EXISTS marcas(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE IF NOT EXISTS produtos(
	id INT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
    categoria TINYINT(1) UNSIGNED NOT NULL,
    modelo VARCHAR(45) NOT NULL,
    capacidade INT(4) UNSIGNED NOT NULL,
    valor DECIMAL(7,2) UNSIGNED NOT NULL,
    marca_id INT UNSIGNED NOT NULL,
    PRIMARY KEY(id),
    INDEX fk_produtos_marcas_idx (marcas_id ASC),
	CONSTRAINT fk_produtos_marcas
		foreign key (marca_id)
        REFERENCES marcas (id)
    
);

INSERT INTO marcas VALUES (1, "Eletrolux");
INSERT INTO marcas VALUES (2, "Consul");
INSERT INTO marcas VALUES (3, "Prosdócimo");