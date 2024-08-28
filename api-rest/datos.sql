USE bd_biblioteca;

-- Insertar datos de prueba en la tabla 'autor'
INSERT INTO autor (dni, nombres, apellidos, fecha_nacimiento, pais) VALUES
('12345678', 'Gabriel', 'García Márquez', '1927-03-06', 'Colombia'),
('87654321', 'Isabel', 'Allende', '1942-08-02', 'Chile'),
('11223344', 'Mario', 'Vargas Llosa', '1936-03-28', 'Perú'),
('44332211', 'Julio', 'Cortázar', '1914-08-26', 'Argentina'),
('99887766', 'Jorge Luis', 'Borges', '1899-08-24', 'Argentina'),
('22334455', 'Octavio', 'Paz', '1914-03-31', 'México'),
('55443322', 'Laura', 'Esquivel', '1950-09-30', 'México'),
('66778899', 'Carlos', 'Fuentes', '1928-11-11', 'México'),
('44556677', 'Pablo', 'Neruda', '1904-07-12', 'Chile'),
('77665544', 'Gabriela', 'Mistral', '1889-04-07', 'Chile');

-- Insertar datos de prueba en la tabla 'libro'
INSERT INTO libro (titulo, id_autor, editorial, nropaginas, stock, estado) VALUES
('Cien años de soledad', 1, 'Sudamericana', 471, 10, 'disponible'),
('El amor en los tiempos del cólera', 1, 'Sudamericana', 348, 6, 'disponible'),
('La casa de los espíritus', 2, 'Sudamericana', 368, 8, 'disponible'),
('Paula', 2, 'Plaza & Janés', 432, 5, 'disponible'),
('La ciudad y los perros', 3, 'Alfaguara', 464, 5, 'disponible'),
('Conversación en la catedral', 3, 'Alfaguara', 640, 3, 'disponible'),
('Rayuela', 4, 'Sudamericana', 736, 7, 'disponible'),
('Ficciones', 5, 'Emecé', 174, 4, 'disponible'),
('El laberinto de la soledad', 6, 'Fondo de Cultura Económica', 282, 6, 'disponible'),
('Como agua para chocolate', 7, 'Doubleday', 224, 9, 'disponible'),
('La muerte de Artemio Cruz', 8, 'Alfaguara', 352, 4, 'disponible'),
('Residencia en la Tierra', 9, 'Losada', 540, 5, 'disponible'),
('Canto general', 9, 'Losada', 567, 3, 'disponible'),
('Desolación', 10, 'Nascimiento', 176, 7, 'disponible'),
('Ternura', 10, 'Nascimiento', 192, 6, 'disponible');
