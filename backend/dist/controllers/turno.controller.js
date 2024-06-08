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
exports.obtenerTodosLosEmpleados = exports.obtenerTurnosPorFecha = exports.actualizarTurnos = exports.obtenerHorarios = exports.generarHorario = void 0;
const turno_model_1 = __importDefault(require("../models/turno.model"));
const empleado_model_1 = __importDefault(require("../models/empleado.model"));
const sequelize_1 = require("sequelize");
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const generarHorario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mes, ano, forzar } = req.body;
    console.log(`Mes: ${mes}, Año: ${ano}, Forzar: ${forzar}`);
    try {
        // Verificar si ya existe un horario para el mes y año dados
        const existingTurnos = yield turno_model_1.default.findOne({
            where: {
                fecha: {
                    [sequelize_1.Op.between]: [
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
        const empleados = yield empleado_model_1.default.findAll();
        if (empleados.length === 0) {
            console.log('No hay empleados disponibles');
            return res.status(404).json({ message: 'No hay empleados disponibles' });
        }
        // Calcular el número de días en el mes
        const diasEnMes = new Date(ano, mes, 0).getDate();
        const turnos = [];
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
            yield turno_model_1.default.destroy({ where: {} });
            console.log('Turnos existentes eliminados.');
        }
        // Guardar los turnos en la base de datos
        yield turno_model_1.default.bulkCreate(turnos);
        console.log('Nuevos turnos creados: ', turnos.length);
        // Devolver el horario generado
        const horario = yield turno_model_1.default.findAll({
            include: [empleado_model_1.default],
            order: [['fecha', 'ASC']]
        });
        res.json(horario);
    }
    catch (error) {
        console.error('Error al generar el horario:', error);
        res.status(500).json({ message: 'Error al generar el horario' });
    }
});
exports.generarHorario = generarHorario;
const obtenerHorarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const horarios = yield turno_model_1.default.findAll({
            include: [empleado_model_1.default],
            order: [['fecha', 'ASC']]
        });
        res.json(horarios);
    }
    catch (error) {
        console.error('Error al obtener los horarios:', error);
        res.status(500).json({ message: 'Error al obtener los horarios' });
    }
});
exports.obtenerHorarios = obtenerHorarios;
const actualizarTurnos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fecha } = req.params;
    const { turnos } = req.body;
    try {
        // Eliminar turnos existentes para la fecha
        yield turno_model_1.default.destroy({ where: { fecha } });
        // Crear nuevos turnos
        const nuevosTurnos = turnos.map((turno) => ({
            fecha,
            RutEmpleado: turno.RutEmpleado
        }));
        yield turno_model_1.default.bulkCreate(nuevosTurnos);
        res.json({ message: 'Turnos actualizados correctamente' });
    }
    catch (error) {
        console.error('Error al actualizar los turnos:', error);
        res.status(500).json({ message: 'Error al actualizar los turnos' });
    }
});
exports.actualizarTurnos = actualizarTurnos;
const obtenerTurnosPorFecha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fecha } = req.params;
    try {
        const turnos = yield turno_model_1.default.findAll({
            where: { fecha },
            include: [empleado_model_1.default]
        });
        res.json(turnos);
    }
    catch (error) {
        console.error('Error al obtener los turnos por fecha:', error);
        res.status(500).json({ message: 'Error al obtener los turnos por fecha' });
    }
});
exports.obtenerTurnosPorFecha = obtenerTurnosPorFecha;
const obtenerTodosLosEmpleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const empleados = yield empleado_model_1.default.findAll();
        res.json(empleados);
    }
    catch (error) {
        console.error('Error al obtener los empleados:', error);
        res.status(500).json({ message: 'Error al obtener los empleados' });
    }
});
exports.obtenerTodosLosEmpleados = obtenerTodosLosEmpleados;
