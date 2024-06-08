"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.descargarArchivo = exports.responderSolicitud = exports.getSolicitudesNoRespondidas = exports.getSolicitudesByUser = exports.createSolicitud = void 0;
const empleadoSolicitud_model_1 = __importDefault(require("../models/empleadoSolicitud.model"));
const multer_1 = __importDefault(require("multer"));
const solicitud_model_1 = __importDefault(require("../models/solicitud.model"));
const empleado_model_1 = __importDefault(require("../models/empleado.model"));
// Configuración de multer para el manejo de archivos con tamaño máximo de 16 MB (MEDIUMBLOB)
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 16 * 1024 * 1024 } // 16 MB
}).single('archivo');
const createSolicitud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Inicio del manejo de la solicitud');
    upload(req, res, function (err) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err instanceof multer_1.default.MulterError) {
                console.error('Error de Multer:', err.message);
                return res.status(500).json({ error: err.message });
            }
            else if (err) {
                console.error('Error:', err.message);
                return res.status(500).json({ error: err.message });
            }
            // Verificar que el archivo y el cuerpo estén presentes
            console.log('Body:', req.body);
            console.log('File:', req.file);
            try {
                const { motivo, fecha, descripcion, rut } = req.body;
                if (empleado_model_1.default.findByPk(rut) == null) {
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
                const solicitud = yield solicitud_model_1.default.create({
                    Tipo: motivo,
                    Archivo: archivo,
                    Fecha: fecha,
                    Descripcion: descripcion
                });
                // Crear la relación en empleadoSolicitud
                yield empleadoSolicitud_model_1.default.create({
                    Rut: rut,
                    Id: solicitud.Id
                });
                console.log('Solicitud creada exitosamente:', solicitud);
                res.status(201).json(solicitud);
            }
            catch (error) {
                console.error('Error al crear solicitud:', error);
                res.status(500).json({ message: 'Error al crear solicitud' });
            }
        });
    });
});
exports.createSolicitud = createSolicitud;
const getSolicitudesByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut } = req.params;
    try {
        // Obtener los IDs de las solicitudes asociadas al usuario
        const empleadoSolicitudes = yield empleadoSolicitud_model_1.default.findAll({
            where: { Rut: rut },
            attributes: ['Id']
        });
        // Extraer los IDs de las solicitudes
        const solicitudIds = empleadoSolicitudes.map(es => es.Id);
        if (solicitudIds.length === 0) {
            return res.status(404).json({ message: 'No se encontraron solicitudes para este usuario' });
        }
        // Obtener las solicitudes correspondientes a los IDs
        const solicitudes = yield solicitud_model_1.default.findAll({
            where: {
                Id: solicitudIds
            }
        });
        res.json(solicitudes);
    }
    catch (error) {
        console.error('Error al obtener solicitudes:', error);
        res.status(500).json({ message: 'Error al obtener solicitudes' });
    }
});
exports.getSolicitudesByUser = getSolicitudesByUser;
const getSolicitudesNoRespondidas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const solicitudes = yield solicitud_model_1.default.findAll({
            where: {
                Respuesta: null
            }
        });
        res.json(solicitudes);
    }
    catch (error) {
        console.error('Error al obtener solicitudes no respondidas:', error);
        res.status(500).json({ message: 'Error al obtener solicitudes no respondidas' });
    }
});
exports.getSolicitudesNoRespondidas = getSolicitudesNoRespondidas;
const responderSolicitud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { respuesta } = req.body;
    try {
        console.log(id, respuesta);
        const solicitud = yield solicitud_model_1.default.findByPk(id);
        if (!solicitud) {
            return res.status(404).json({ message: 'Solicitud no encontrada' });
        }
        solicitud.Respuesta = respuesta;
        yield solicitud.save();
        res.json({ message: 'Solicitud respondida exitosamente' });
    }
    catch (error) {
        console.error('Error al responder la solicitud:', error);
        res.status(500).json({ message: 'Error al responder la solicitud' });
    }
});
exports.responderSolicitud = responderSolicitud;
const descargarArchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const solicitud = yield solicitud_model_1.default.findByPk(id);
        if (!solicitud || !solicitud.Archivo) {
            return res.status(404).json({ message: 'Archivo no encontrado' });
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="archivo.pdf"');
        res.send(solicitud.Archivo);
    }
    catch (error) {
        console.error('Error al descargar el archivo:', error);
        res.status(500).json({ message: 'Error al descargar el archivo' });
    }
});
exports.descargarArchivo = descargarArchivo;
