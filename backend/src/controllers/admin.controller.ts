import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Empleado from '../models/empleado.model';
import Admin from '../models/admin.model';
import Turno from '../models/turno.model';

// Obtener todos los empleados
export const getEmpleados = async (req: Request, res: Response) => {
  try {
    const empleados = await Empleado.findAll();
    res.json(empleados);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      msg: 'Error al obtener la lista de empleados',
      error,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  
  try {
    let usuario = await Empleado.findByPk(id);

    if (!usuario) {
      usuario = await Admin.findByPk(id);
      
      if (!usuario) {
        return res.status(404).json({
          msg: `No existe un empleado o administrador con ID ${id}`,
        });
      }
    }

    res.json(usuario);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      msg: 'Error al obtener el empleado o administrador',
      error,
    });
  }
};

// Crear un nuevo empleado
export const createEmpleado = async (req: Request, res: Response) => {
  const { body } = req;
  body.role = 0; // Asegurar que el nuevo empleado tenga el role 0

  try {
    const nuevoEmpleado = await Empleado.create(body);
    res.status(201).json({
      msg: 'Empleado creado correctamente',
      empleado: nuevoEmpleado,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      msg: 'Error al crear el empleado',
      error,
    });
  }
};

// Actualizar un empleado existente
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params; 
  const { body } = req;

  try {
    let usuario = await Empleado.findByPk(id);

    if (!usuario) {
      usuario = await Admin.findByPk(id);
      if (!usuario) {
        return res.status(404).json({
          msg: 'Empleado o administrador no encontrado',
        });
      }
    }

    // Verificar si hay una nueva contraseña en el cuerpo de la solicitud
    console.log(body)
    if (body.Contrasena) {
      body.Contraseña = await bcrypt.hash(body.Contrasena, 10);
    }
    await usuario.update(body);
    res.json({
      msg: `${usuario instanceof Empleado ? 'Empleado' : 'Administrador'} actualizado correctamente`,
      usuario,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      msg: 'Error al actualizar el empleado o administrador',
      error,
    });
  }
};

// Eliminar un empleado
export const deleteEmpleado = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log(id);
    const empleado = await Empleado.findByPk(id);

    if (empleado) {
      // Eliminar los turnos asociados al empleado
      await Turno.destroy({ where: { RutEmpleado: id } });

      // Ahora eliminar el empleado
      await empleado.destroy();
      res.json({
        msg: 'El empleado fue eliminado con éxito',
      });
    } else {
      res.status(404).json({
        msg: `No existe un empleado con ID ${id}`,
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      msg: 'Error al eliminar el empleado',
      error,
    });
  }
};

export const crearAdministrador = async (req: Request, res: Response) => {
  const { Rut, Correo, Contraseña, Nombre } = req.body;

  try {
    // Verificar si el administrador ya existe
    const adminExistente = await Admin.findOne({ where: { Rut } });
    if (adminExistente) {
      return res.status(400).json({ message: 'El administrador ya existe' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(Contraseña, 10);

    // Crear el nuevo administrador
    const nuevoAdmin = await Admin.create({
      Rut,
      Correo,
      Contraseña: hashedPassword,
      Nombre,
      role: 1  // Asegúrate de que el rol sea el de administrador
    });

    res.status(201).json(nuevoAdmin);
  } catch (error) {
    console.error('Error al crear el administrador:', error);
    res.status(500).json({ message: 'Error al crear el administrador' });
  }
};