# Goty App

## Descripción
Goty App es una aplicación de gestión de empleados y recursos que permite a los administradores gestionar turnos, recursos y solicitudes de los empleados.

## Requisitos
- Node.js, puedes instalarlo desde acá [nodejs.org](https://nodejs.org/en/download/)
   - Reinicia tu computador después de instalar para asegurar que los cambios tomen efecto.
- npm (Node Package Manager)
- XAMPP (para gestionar MySQL y Apache en Windows), puedes instalarlo desde acá [xampp](https://www.apachefriends.org/es/download.html)
- **Instalación de Ionic CLI**:
   - Abre Visual Studio Code (VS Code) y abre una terminal.
   - Ejecuta el siguiente comando para instalar Ionic CLI globalmente:
     ```
     npm i -g @ionic/cli
     ```

## Instalación

### 1. Clonar el repositorio
```bash
git clone <https://github.com/Melinnaaa/GOTY.git>
cd goty-app
```
### 2. Configurar la base de datos
- Abre XAMPP y asegúrate de que MySQL esté en funcionamiento.
- Abre phpMyAdmin, accede a la pestaña sql en la parte superior y copia el contenido de goty.sql.
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
* npm install -g nodemon
* tsc --watch
* Desde otra terminal en cd backend
* nodemon dist/index.js
El backend se ejecutará en el puerto 3000.

### 2. Iniciar el frontend
* Abrir otra terminal
* cd frontend
* ionic serve

