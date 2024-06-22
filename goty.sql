
CREATE DATABASE IF NOT EXISTS goty;
USE goty;

CREATE TABLE Empleado (
    Rut VARCHAR(12) PRIMARY KEY,
    Correo VARCHAR(256) NOT NULL,
    Contraseña CHAR(60) NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    role TINYINT(1) NOT NULL DEFAULT 0 -- Añadido el atributo role con valor por defecto 0
);

CREATE TABLE turnos (
  fecha DATE NOT NULL,
  RutEmpleado VARCHAR(12) NOT NULL,
  PRIMARY KEY (fecha, RutEmpleado),
  FOREIGN KEY (RutEmpleado) REFERENCES empleado(Rut)
);

CREATE TABLE Recurso (
    idRecurso INT PRIMARY KEY AUTO_INCREMENT,
    Disponibilidad BOOLEAN NOT NULL,
    Rut VARCHAR(12),
    Tipo VARCHAR(255) NOT NULL,
    Fecha DATE,
    FOREIGN KEY (Rut) REFERENCES empleado(Rut)
);

CREATE TABLE Administrador (
    Rut VARCHAR(12) PRIMARY KEY,
    Correo VARCHAR(256) NOT NULL,
    Contraseña CHAR(60) NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    role TINYINT(1) NOT NULL DEFAULT 1 
);

 

CREATE TABLE empleadoSolicitud (
    Rut VARCHAR(12),
    Id INT,
    PRIMARY KEY (Rut, Id),
    FOREIGN KEY (Rut) REFERENCES Empleado(Rut),
    FOREIGN KEY (Id) REFERENCES Solicitud(Id)
);

INSERT INTO Empleado (Rut, Correo, Contraseña, Nombre, role) VALUES
('18.234.567-8', 'maria.gonzalez@example.com', '$2b$10$.lfOsrf9U/TapleXxRox4.I0clKBnfcM1gWl3w0DwxnQyCQHMYMAS', 'María González', 0),
('16.234.567-9', 'juan.perez@example.com', '$2b$10$.lfOsrf9U/TapleXxRox4.I0clKBnfcM1gWl3w0DwxnQyCQHMYMAS', 'Juan Pérez', 0),
('15.456.789-0', 'ana.sanchez@example.com', '$2b$10$.lfOsrf9U/TapleXxRox4.I0clKBnfcM1gWl3w0DwxnQyCQHMYMAS', 'Ana Sánchez', 0),
('12.345.678-5', 'carlos.martinez@example.com', '$2b$10$.lfOsrf9U/TapleXxRox4.I0clKBnfcM1gWl3w0DwxnQyCQHMYMAS', 'Carlos Martínez', 0),
('13.579.246-3', 'luisa.fernandez@example.com', '$2b$10$.lfOsrf9U/TapleXxRox4.I0clKBnfcM1gWl3w0DwxnQyCQHMYMAS', 'Luisa Fernández', 0),
('14.567.892-1', 'jose.garcia@example.com', '$2b$10$.lfOsrf9U/TapleXxRox4.I0clKBnfcM1gWl3w0DwxnQyCQHMYMAS', 'José García', 0),
('16.789.012-4', 'laura.lopez@example.com', '$2b$10$.lfOsrf9U/TapleXxRox4.I0clKBnfcM1gWl3w0DwxnQyCQHMYMAS', 'Laura López', 0),
('19.876.543-2', 'roberto.diaz@example.com', '$2b$10$.lfOsrf9U/TapleXxRox4.I0clKBnfcM1gWl3w0DwxnQyCQHMYMAS', 'Roberto Díaz', 0),
('13.245.768-9', 'elena.ramirez@example.com', '$2b$10$.lfOsrf9U/TapleXxRox4.I0clKBnfcM1gWl3w0DwxnQyCQHMYMAS', 'Elena Ramírez', 0),
('11.234.567-1', 'pedro.morales@example.com', '$2b$10$.lfOsrf9U/TapleXxRox4.I0clKBnfcM1gWl3w0DwxnQyCQHMYMAS', 'Pedro Morales', 0);
INSERT INTO Administrador (Rut, Correo, Contraseña, Nombre, role) VALUES
('21.071.085-k', 'cdiazmorel@gmail.com', '$2b$10$.lfOsrf9U/TapleXxRox4.I0clKBnfcM1gWl3w0DwxnQyCQHMYMAS', 'Camila Díaz', 1),
('20.441.061-5', 'javier@gmail.com', '$2b$10$.lfOsrf9U/TapleXxRox4.I0clKBnfcM1gWl3w0DwxnQyCQHMYMAS', 'Javier Marín', 1),
('21.214.712-5', 'arturoreyescaceres@gmail.com', '$2b$10$.lfOsrf9U/TapleXxRox4.I0clKBnfcM1gWl3w0DwxnQyCQHMYMAS', 'Arturo Reyes', 1);
INSERT INTO Recurso (idRecurso, Disponibilidad, Rut, Tipo, Fecha) VALUES
(1, 1, NULL, 'Oficina', NULL),
(2, 1, NULL, 'Oficina', NULL),
(3, 1, NULL, 'Oficina', NULL),
(4, 1, NULL, 'Oficina', NULL),
(5, 1, NULL, 'Oficina', NULL),
(6, 1, NULL, 'Cubículo', NULL),
(7, 1, NULL, 'Cubículo', NULL),
(8, 1, NULL, 'Cubículo', NULL),
(9, 1, NULL, 'Cubículo', NULL),
(10, 1, NULL, 'Cubículo', NULL),
(11, 1, NULL, 'Estacionamiento', NULL),
(12, 1, NULL, 'Estacionamiento', NULL),
(13, 1, NULL, 'Estacionamiento', NULL),
(14, 1, NULL, 'Estacionamiento', NULL),
(15, 1, NULL, 'Estacionamiento', NULL);
