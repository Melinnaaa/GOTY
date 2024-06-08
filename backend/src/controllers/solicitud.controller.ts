import { Request, Response } from 'express';
import EmpleadoSolicitud from '../models/empleadoSolicitud.model';
import multer from 'multer';
import Solicitud from '../models/solicitud.model';
import Empleado from '../models/empleado.model';

// Configuración de multer para el manejo de archivos con tamaño máximo de 16 MB (MEDIUMBLOB)
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 16 * 1024 * 1024 } // 16 MB
}).single('archivo');

export const createSolicitud = async (req: Request, res: Response) => {
    console.log('Inicio del manejo de la solicitud');
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            console.error('Error de Multer:', err.message);
            return res.status(500).json({ error: err.message });
        } else if (err) {
            console.error('Error:', err.message);
            return res.status(500).json({ error: err.message });
        }

        // Verificar que el archivo y el cuerpo estén presentes
        console.log('Body:', req.body);
        console.log('File:', req.file);

        try {
            const { motivo, fecha, descripcion, rut } = req.body;
            if (Empleado.findByPk(rut) == null)
            {
                return res.status(401).json({ message: 'Los administradores no pueden realizar solicitudes.' });
            }
            const archivo = req.file ? req.file.buffer : null;

            // Logging para verificar los datos recibidos
            console.log('Datos recibidos del formulario:');
            console.log('Motivo:', motivo);
            console.log('Fecha:', fecha);
            console.log('Descripcion:', descripcion);
            console.log('Archivo:', archivo ? 'Archivo recibido' : 'No se recibió archivo');
            console.log('Rut:', rut);

            // Verificar que los datos no sean nulos
            if (!motivo || !fecha || !descripcion || !rut) {
                console.error('Faltan datos en la solicitud');
                return res.status(400).json({ message: 'Faltan datos en la solicitud' });
            }

            // Crear la solicitud
            const solicitud = await Solicitud.create({
                Tipo: motivo,
                Archivo: archivo,
                Fecha: fecha,
                Descripcion: descripcion
            });

            // Crear la relación en empleadoSolicitud
            await EmpleadoSolicitud.create({
                Rut: rut,
                Id: solicitud.Id
            });

            console.log('Solicitud creada exitosamente:', solicitud);
            res.status(201).json(solicitud);
        } catch (error) {
            console.error('Error al crear solicitud:', error);
            res.status(500).json({ message: 'Error al crear solicitud' });
        }
    });
};

export const getSolicitudesByUser = async (req: Request, res: Response) => {
    const { rut } = req.params;
    try {
        // Obtener los IDs de las solicitudes asociadas al usuario
        const empleadoSolicitudes = await EmpleadoSolicitud.findAll({
            where: { Rut: rut },
            attributes: ['Id']
        });

        // Extraer los IDs de las solicitudes
        const solicitudIds = empleadoSolicitudes.map(es => es.Id);

        if (solicitudIds.length === 0) {
            return res.status(404).json({ message: 'No se encontraron solicitudes para este usuario' });
        }

        // Obtener las solicitudes correspondientes a los IDs
        const solicitudes = await Solicitud.findAll({
            where: {
                Id: solicitudIds
            }
        });

        res.json(solicitudes);
    } catch (error) {
        console.error('Error al obtener solicitudes:', error);
        res.status(500).json({ message: 'Error al obtener solicitudes' });
    }
};

export const getSolicitudesNoRespondidas = async (req: Request, res: Response) => {
    try {
        const solicitudes = await Solicitud.findAll({
            where: {
                Respuesta: null
            }
        });
        res.json(solicitudes);
    } catch (error) {
        console.error('Error al obtener solicitudes no respondidas:', error);
        res.status(500).json({ message: 'Error al obtener solicitudes no respondidas' });
    }
};

export const responderSolicitud = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { respuesta } = req.body;

    try {
        console.log(id, respuesta)
        const solicitud = await Solicitud.findByPk(id);

        if (!solicitud) {
            return res.status(404).json({ message: 'Solicitud no encontrada' });
        }

        solicitud.Respuesta = respuesta;
        await solicitud.save();

        res.json({ message: 'Solicitud respondida exitosamente' });
    } catch (error) {
        console.error('Error al responder la solicitud:', error);
        res.status(500).json({ message: 'Error al responder la solicitud' });
    }
};

export const descargarArchivo = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const solicitud = await Solicitud.findByPk(id);
  
      if (!solicitud || !solicitud.Archivo) {
        return res.status(404).json({ message: 'Archivo no encontrado' });
      }
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="archivo.pdf"');
      res.send(solicitud.Archivo);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      res.status(500).json({ message: 'Error al descargar el archivo' });
    }
  };

