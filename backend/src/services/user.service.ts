import connection from '../db/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { QueryTypes } from 'sequelize';

const login = async (Correo: string, password: string) => {
  try {
    console.log('Iniciando sesión para:', Correo);

    // Ejecutar la consulta para obtener el usuario por correo en la tabla Administrador
    let results: any = await connection.query(
      'SELECT * FROM Administrador WHERE Correo = ?',
      {
        replacements: [Correo],
        type: QueryTypes.SELECT
      }
    );

    let user = results.length > 0 ? results[0] : null;

    // Si no se encontró en la tabla Administrador, buscar en la tabla Empleado
    if (!user) {
      results = await connection.query(
        'SELECT * FROM Empleado WHERE Correo = ?',
        {
          replacements: [Correo],
          type: QueryTypes.SELECT
        }
      );
      user = results.length > 0 ? results[0] : null;
    }

    // Si no se encontró en ninguna tabla, lanzar error
    if (!user) {
      throw new Error('El correo electrónico no existe');
    }

    // Comparar la contraseña ingresada con la contraseña hasheada almacenada
    const isPasswordValid = await bcrypt.compare(password, user.Contraseña);
    if (!isPasswordValid) {
      throw new Error('La contraseña es incorrecta');
    }

    return { user };
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

export default { login };
