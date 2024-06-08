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
exports.obtenerReservasPorEmpleado = exports.liberarRecursoManualmente = exports.obtenerRecursosNoDisponibles = exports.obtenerRecursosDisponibles = exports.reservarRecurso = void 0;
const recurso_model_1 = __importDefault(require("../models/recurso.model"));
const reservarRecurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idRecurso } = req.params;
    const { rut } = req.body;
    try {
        const recurso = yield recurso_model_1.default.findByPk(idRecurso);
        if (!recurso) {
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }
        if (!recurso.Disponibilidad) {
            return res.status(400).json({ message: 'Recurso no disponible' });
        }
        recurso.Disponibilidad = false;
        recurso.Rut = rut;
        recurso.Fecha = new Date();
        yield recurso.save();
        res.json({ message: 'Recurso reservado exitosamente', recurso });
    }
    catch (error) {
        console.error('Error al reservar el recurso:', error);
        res.status(500).json({ message: 'Error al reservar el recurso' });
    }
});
exports.reservarRecurso = reservarRecurso;
const obtenerRecursosDisponibles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recursos = yield recurso_model_1.default.findAll({
            where: {
                Disponibilidad: true
            }
        });
        res.json(recursos);
    }
    catch (error) {
        console.error('Error al obtener recursos disponibles:', error);
        res.status(500).json({ message: 'Error al obtener recursos disponibles' });
    }
});
exports.obtenerRecursosDisponibles = obtenerRecursosDisponibles;
const obtenerRecursosNoDisponibles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recursosNoDisponibles = yield recurso_model_1.default.findAll({
            where: {
                Disponibilidad: false,
            },
        });
        res.json(recursosNoDisponibles);
    }
    catch (error) {
        console.error('Error al obtener recursos no disponibles:', error);
        res.status(500).json({ message: 'Error al obtener recursos no disponibles' });
    }
});
exports.obtenerRecursosNoDisponibles = obtenerRecursosNoDisponibles;
const liberarRecursoManualmente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idRecurso } = req.params;
    try {
        const recurso = yield recurso_model_1.default.findByPk(idRecurso);
        if (!recurso) {
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }
        recurso.Disponibilidad = true;
        recurso.Rut = null;
        recurso.Fecha = null;
        yield recurso.save();
        res.json({ message: 'Recurso liberado exitosamente', recurso });
    }
    catch (error) {
        console.error('Error al liberar el recurso:', error);
        res.status(500).json({ message: 'Error al liberar el recurso' });
    }
});
exports.liberarRecursoManualmente = liberarRecursoManualmente;
const obtenerReservasPorEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut } = req.params;
    try {
        const reservas = yield recurso_model_1.default.findAll({
            where: { Rut: rut }
        });
        res.json(reservas);
    }
    catch (error) {
        console.error('Error al obtener las reservas:', error);
        res.status(500).json({ message: 'Error al obtener las reservas' });
    }
});
exports.obtenerReservasPorEmpleado = obtenerReservasPorEmpleado;
