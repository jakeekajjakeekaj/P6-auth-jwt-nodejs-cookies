-- CREAR DB
CREATE DATABASE p6_auth_jwt;

USE p6_auth_jwt;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(20) NOT NULL
);

-- En la tabla se insertarán los cambios realizados a las tablas, para que igual se vea este tipo de soluciones, por lo que al crear esta DB, no es necesario seguir todo el .sql, solamente lo necesario

ALTER TABLE users MODIFY password VARCHAR(255) NOT NULL;
