CREATE DATABASE redis;

use redis;

CREATE TABLE usuarios (
  id INT PRIMARY KEY,
  nombre VARCHAR(255),
  edad INT
);

INSERT INTO usuarios (id, nombre, edad) VALUES
(1, 'Juan', 25),
(2, 'María', 30),
(3, 'Pedro', 40);

select * from usuarios;