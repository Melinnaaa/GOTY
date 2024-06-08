import { Request, Response } from 'express';
import Empleado from '../models/empleado.model'; // Cambiar la referencia al modelo de Empleado
import bcrypt from 'bcrypt';
import axios from 'axios';

export const postUser = async (req: Request, res: Response) => {
  const { Rut, Contraseña, captchaToken, ...restoDatos } = req.body;
  console.log(Rut, Contraseña)
  // Verificar el token de reCAPTCHA
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

  try {
    const response = await axios.post(verificationUrl);
    const { success, score } = response.data;

    // Define un umbral mínimo de puntuación para considerar una interacción como válida
    const scoreThreshold = 0.5;

    if (!success || score < scoreThreshold) {
      return res.status(400).json({ msg: 'Captcha inválido o interacción sospechosa' });
    }

    // Hashear la contraseña antes de guardar el usuario
    const hashedPassword = await bcrypt.hash(Contraseña, 10);

    // Crear o encontrar un usuario en la tabla de Empleados
    const [user, created] = await Empleado.findOrCreate({
      where: { Rut },
      defaults: {
        ...restoDatos,
        Contraseña: hashedPassword, // Guarda la contraseña hasheada
        role: 0, // Asegúrate de que el rol sea 0 para los empleados
      }
    });

    if (created) {
      res.status(201).json({
        msg: 'Empleado creado exitosamente',
        user: {
          Rut: user.Rut,
          Correo: user.Correo,
          Nombre: user.Nombre,
          role: user.role,
        }
      });
    } else {
      res.status(200).json({
        msg: 'El empleado ya existe',
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      msg: 'Error creando al empleado',
      error
    });
  }
};
