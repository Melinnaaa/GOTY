import { Request, Response } from 'express';
import Recurso from '../models/recurso.model';

export const reservarRecurso = async (req: Request, res: Response) => {
  const { idRecurso } = req.params;
  const { rut } = req.body;

  try {
    const recurso = await Recurso.findByPk(idRecurso);

    if (!recurso) {
      return res.status(404).json({ message: 'Recurso no encontrado' });
    }

    if (!recurso.Disponibilidad) {
      return res.status(400).json({ message: 'Recurso no disponible' });
    }

    recurso.Disponibilidad = false;
    recurso.Rut = rut;
    recurso.Fecha = new Date();
    await recurso.save();

    res.json({ message: 'Recurso reservado exitosamente', recurso });
  } catch (error) {
    console.error('Error al reservar el recurso:', error);
    res.status(500).json({ message: 'Error al reservar el recurso' });
  }
};


export const obtenerRecursosDisponibles = async (req: Request, res: Response) => {
  try {
    const recursos = await Recurso.findAll({
      where: {
        Disponibilidad: true
      }
    });
    res.json(recursos);
  } catch (error) {
    console.error('Error al obtener recursos disponibles:', error);
    res.status(500).json({ message: 'Error al obtener recursos disponibles' });
  }
};

export const obtenerRecursosNoDisponibles = async (req: Request, res: Response) => {
    try {
      const recursosNoDisponibles = await Recurso.findAll({
        where: {
          Disponibilidad: false,
        },
      });
  
      res.json(recursosNoDisponibles);
    } catch (error) {
      console.error('Error al obtener recursos no disponibles:', error);
      res.status(500).json({ message: 'Error al obtener recursos no disponibles' });
    }
  };
  
  export const liberarRecursoManualmente = async (req: Request, res: Response) => {
    const { idRecurso } = req.params;
  
    try {
      const recurso = await Recurso.findByPk(idRecurso);
  
      if (!recurso) {
        return res.status(404).json({ message: 'Recurso no encontrado' });
      }
  
      recurso.Disponibilidad = true;
      recurso.Rut = null;
      recurso.Fecha = null;
      await recurso.save();
  
      res.json({ message: 'Recurso liberado exitosamente', recurso });
    } catch (error) {
      console.error('Error al liberar el recurso:', error);
      res.status(500).json({ message: 'Error al liberar el recurso' });
    }
  };

  export const obtenerReservasPorEmpleado = async (req: Request, res: Response) => {
    const { rut } = req.params;
  
    try {
      const reservas = await Recurso.findAll({
        where: { Rut: rut }
      });
  
      res.json(reservas);
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
      res.status(500).json({ message: 'Error al obtener las reservas' });
    }
  };
