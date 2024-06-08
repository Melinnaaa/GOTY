import cron from 'node-cron';
import Recurso from '../models/recurso.model';
import { Op } from 'sequelize';

const releaseResources = () => {
  // Programar la tarea para que se ejecute diariamente a medianoche
  cron.schedule('0 0 * * *', async () => {
    console.log('Liberando recursos...');

    try {
      // Obtener la fecha actual
      const today = new Date();
      const formattedToday = today.toISOString().split('T')[0];

      // Buscar los recursos reservados en fechas anteriores a hoy
      const recursosAntiguos = await Recurso.findAll({
        where: {
          Fecha: {
            [Op.lt]: formattedToday,
          },
        },
      });

      // Liberar los recursos
      for (const recurso of recursosAntiguos) {
        recurso.Disponibilidad = true;
        recurso.Rut = null;
        recurso.Fecha = null;
        await recurso.save();
      }

      console.log('Recursos liberados');
    } catch (error) {
      console.error('Error al liberar recursos:', error);
    }
  });
};

export default releaseResources;
