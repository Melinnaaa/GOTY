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

// Obtener un empleado por ID
export const getEmpleadoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const empleado = await Empleado.findByPk(id);

    if (empleado) {
      res.json(empleado);
    } else {
      res.status(404).json({
        msg: `No existe un empleado con ID ${id}`,
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      msg: 'Error al obtener el empleado',
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
export const updateEmpleado = async (req: Request, res: Response) => {
  const { id } = req.params; 
  const { body } = req;

  try {
    const empleado = await Empleado.findByPk(id);

    if (!empleado) {
      return res.status(404).json({
        msg: 'Empleado no encontrado',
      });
    }

    await empleado.update(body);
    res.json({
      msg: 'Empleado actualizado correctamente',
      empleado,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      msg: 'Error al actualizar el empleado',
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