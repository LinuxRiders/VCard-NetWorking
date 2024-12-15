CREATE DATABASE vcard;

USE vcard;

-- DROP TABLE usuario;
CREATE TABLE usuario(
 id INT AUTO_INCREMENT PRIMARY KEY,
 foto TEXT,                         -- URL de la foto (usamos TEXT por longitud variable)
 nombres VARCHAR(200),              -- Nombre del usuario
 apellidos VARCHAR(100),            -- Apellido del usuario
 cargo TEXT,                        -- Cargo o puesto laboral
 genero ENUM('Masculino', 'Femenino', 'Otro'), -- Género con valores predefinidos
 procedencia VARCHAR(255),          -- Lugar de procedencia
 telefono VARCHAR(15),               -- Número de teléfono
 correo VARCHAR(100) UNIQUE         -- Correo electrónico único
);

INSERT INTO usuario (nombres, apellidos, cargo, genero, procedencia, telefono, correo) VALUES
('Emanuel', 'Chavez Ricra', 'Especialista en Diseño de Productos Turisticos', 'Masculino', 'Ccaijo', '+51954335587', 'emanuel.chavez.ricra@gmail.com'),
('Dante', 'Ortiz Diaz', 'Coordinador Linea de Emprendimiento - Ccaijo', 'Masculino', 'Ccaijo', '+51984020401', 'dortiz@ccaijo.org'),
('Yojhana', 'Garcés Vargas', 'Coordinador Linea de Turismo Comunitario - Ccaijo', 'Femenino', 'Ccaijo', '+51973576765', 'ygarces@ccaijo.org'),
('Williams', 'Rivera Auccaille', 'Especialista en Audio Visuales - Ccaijo', 'Masculino', 'Ccaijo', '+51975576419', 'wrivera@ccaijo.org'),
('Eberth', 'Molina Romero', 'Director - Ccaijo', 'Masculino', 'Ccaijo', '+51987839711', 'emolina@ccaijo.org'),
('Tany', 'Huancahuire Garrafa', 'Coordinador Convenio AECID - Ccaijo', 'Masculino', 'Ccaijo', '+51986850764', 'thuancahuire@ccaijo.org'),
('Regina Alicia', 'a Mandra Cuchicari', 'Promotora Turismo Comunitario - Pacchanta', 'Femenino', 'Pacchanta', '+51927289288', 'aliciamandura8@gmail.com'),
('Wilbert', 'Crispin Jancco', 'Promotor Turismo Comunitario - Pacchanta', 'Masculino', 'Pacchanta', '+51925449489', 'wilbertcrispinjancco@gmail.com'),
('Antenor', 'Percca Inquillay', 'Promotor Turismo Comunitario - Cuyuni', 'Masculino', 'Cuyuni', '+51967784062', 'antenorpercca@gmail.com'),
('Melina Briceyda', 'Huaman Choqque', 'Promotor Turismo Comunitario - Andamayo', 'Femenino', 'Andamayo', '+51900071814', 'huamanchoqquemelinabriceyda@gmail.com'),
('Maritza', 'Mamani Quispe', 'Promotor Turismo Comunitario - Andamayo', 'Femenino', 'Andamayo', '+51992240837', 'mamaniquispemaritza94@gmail.com'),
('Maria Milagros', 'Chillihuane Yana', 'Promotor Turismo Comunitario - Yanacancha', 'Femenino', 'Yanacancha', '+51953893154', 'Chillehuaniyanamariamilagros@gmail.com');


SELECT * FROM usuario;

