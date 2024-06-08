import { Request, Response } from 'express';
import Turno from '../models/turno.model';
import Empleado from '../models/empleado.model';
import { Op } from 'sequelize';

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const generarHorario = async (req: Request, res: Response) => {
  const { mes, ano, forzar } = req.body;

  console.log(`Mes: ${mes}, Año: ${ano}, Forzar: ${forzar}`);

  try {
    // Verificar si ya existe un horario para el mes y año dados
    const existingTurnos = await Turno.findOne({
      where: {
        fecha: {
          [Op.between]: [
            new Date(ano, mes - 1, 1),
            new Date(ano, mes, 0)
          ]
        }
      }
    });

    if (existingTurnos && !forzar) {
      console.log('Ya existe un horario para este mes y año');
      return res.status(400).json({ message: 'Ya existe un horario para este mes y año' });
    }

    const empleados = await Empleado.findAll();

    if (empleados.length === 0) {
      console.log('No hay empleados disponibles');
      return res.status(404).json({ message: 'No hay empleados disponibles' });
    }

    // Calcular el número de días en el mes
    const diasEnMes = new Date(ano, mes, 0).getDate();
    const turnos: any[] = [];
    const mitadEmpleados = Math.ceil(empleados.length / 2);

    console.log(`Generando turnos para ${diasEnMes} días con ${empleados.length} empleados.`);

    for (let dia = 1; dia <= diasEnMes; dia++) {
      const fecha = new Date(ano, mes - 1, dia);

      // Seleccionar la mitad de los empleados para el día de manera aleatoria
      const empleadosShuffled = shuffleArray([...empleados]);
      const empleadosAsignadosHoy = empleadosShuffled.slice(0, mitadEmpleados);

      empleadosAsignadosHoy.forEach(empleado => {
        turnos.push({
          fecha: fecha,
          RutEmpleado: empleado.Rut
        });
      });
    }

    // Borrar turnos existentes para evitar duplicados
    if (forzar) {
      await Turno.destroy({ where: {} });
      console.log('Turnos existentes eliminados.');
    }

    // Guardar los turnos en la base de datos
    await Turno.bulkCreate(turnos);
    console.log('Nuevos turnos creados: ', turnos.length);

    // Devolver el horario generado
    const horario = await Turno.findAll({
      include: [Empleado],
      order: [['fecha', 'ASC']]
    });

    res.json(horario);
  } catch (error) {
    console.error('Error al generar el horario:', error);
    res.status(500).json({ message: 'Error al generar el horario' });
  }
};

export const obtenerHorarios = async (req: Request, res: Response) => {
  try {
    const horarios = await Turno.findAll({
      include: [Empleado],
      order: [['fecha', 'ASC']]
    });

    res.json(horarios);
  } catch (error) {
    console.error('Error al obtener los horarios:', error);
    res.status(500).json({ message: 'Error al obtener los horarios' });
  }
};

export const actualizarTurnos = async (req: Request, res: Response) => {
  const { fecha } = req.params;
  const { turnos } = req.body;

  try {
    // Eliminar turnos existentes para la fecha
    await Turno.destroy({ where: { fecha } });

    // Crear nuevos turnos
    const nuevosTurnos = turnos.map((turno: any) => ({
      fecha,
      RutEmpleado: turno.RutEmpleado
    }));
    await Turno.bulkCreate(nuevosTurnos);

    res.json({ message: 'Turnos actualizados correctamente' });
  } catch (error) {
    console.error('Error al actualizar los turnos:', error);
    res.status(500).json({ message: 'Error al actualizar los turnos' });
  }
};

export const obtenerTurnosPorFecha = async (req: Request, res: Response) => {
  const { fecha } = req.params;

  try {
    const turnos = await Turno.findAll({
      where: { fecha },
      include: [Empleado]
    });

    res.json(turnos);
  } catch (error) {
    console.error('Error al obtener los turnos por fecha:', error);
    res.status(500).json({ message: 'Error al obtener los turnos por fecha' });
  }
};

export const obtenerTodosLosEmpleados = async (req: Request, res: Response) => {
  try {
    const empleados = await Empleado.findAll();
    res.json(empleados);
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    res.status(500).json({ message: 'Error al obtener los empleados' });
  }
};
