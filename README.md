# Goty App

## Descripción
Goty App es una aplicación de gestión de empleados y recursos que permite a los administradores gestionar turnos, recursos y solicitudes de los empleados.

## Requisitos
- Node.js
- npm (Node Package Manager)
- MySQL
- XAMPP (opcional, para gestionar MySQL y Apache en Windows)

## Instalación

### 1. Clonar el repositorio
```bash
git clone <https://github.com/Melinnaaa/GOTY.git>
cd goty-app
```
### 2. Configurar la base de datos
- Abre XAMPP y asegúrate de que MySQL esté en funcionamiento.
- Abre phpMyAdmin y crea una nueva base de datos llamada goty.
- Importa el archivo goty.sql (si existe) en la base de datos goty.
### 4. Instalar dependencias
#### Backend
* cd backend
* npm install
#### Frontend
* cd ../frontend
* npm install

### 5. Configurar MySQL
* Para manejar archivos de hasta 16 MB, debes ajustar la configuración de MySQL. Abre el archivo my.ini en el directorio de instalación de XAMPP (generalmente en C:\xampp\mysql\bin\my.ini) y añade o modifica la siguiente línea en la sección [mysqld]:
* max_allowed_packet=16M
* Luego reinicia MySQL desde el panel de control de XAMPP.

## Ejecución
### 1. Iniciar el backend
* cd backend
* npm start
El backend se ejecutará en el puerto 3000.

### 2. Iniciar el frontend
cd ../frontend
npm start

## Dependencias
###Backend
* express
* sequelize
* mysql2
* bcrypt
* jsonwebtoken
* multer
### Frontend
* @angular/core
* @angular/cli
* @fullcalendar/angular
* @fullcalendar/daygrid
* @fullcalendar/interaction
* ionicons

