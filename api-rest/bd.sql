-- Crear base de datos
CREATE DATABASE IF NOT EXISTS bd_biblioteca;
USE bd_biblioteca;

-- Crear tabla 'autor'
CREATE TABLE IF NOT EXISTS autor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    pais VARCHAR(50) NOT NULL
);

-- Crear tabla 'libro'
CREATE TABLE IF NOT EXISTS libro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    id_autor INT NOT NULL,
    editorial VARCHAR(100) NOT NULL,
    nropaginas INT NOT NULL,
    stock INT DEFAULT 0,
    estado VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_autor) REFERENCES autor(id) ON DELETE CASCADE ON UPDATE CASCADE
);
