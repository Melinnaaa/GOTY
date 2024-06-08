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
exports.crearAdministrador = exports.deleteEmpleado = exports.updateUser = exports.createEmpleado = exports.getUserById = exports.getEmpleados = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const empleado_model_1 = __importDefault(require("../models/empleado.model"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
const turno_model_1 = __importDefault(require("../models/turno.model"));
// Obtener todos los empleados
const getEmpleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const empleados = yield empleado_model_1.default.findAll();
        res.json(empleados);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            msg: 'Error al obtener la lista de empleados',
            error,
        });
    }
});
exports.getEmpleados = getEmpleados;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    try {
        let usuario = yield empleado_model_1.default.findByPk(id);
        if (!usuario) {
            usuario = yield admin_model_1.default.findByPk(id);
            if (!usuario) {
                return res.status(404).json({
                    msg: `No existe un empleado o administrador con ID ${id}`,
                });
            }
        }
        res.json(usuario);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            msg: 'Error al obtener el empleado o administrador',
            error,
        });
    }
});
exports.getUserById = getUserById;
// Crear un nuevo empleado
const createEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    body.role = 0; // Asegurar que el nuevo empleado tenga el role 0
    try {
        const nuevoEmpleado = yield empleado_model_1.default.create(body);
        res.status(201).json({
            msg: 'Empleado creado correctamente',
            empleado: nuevoEmpleado,
        });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            msg: 'Error al crear el empleado',
            error,
        });
    }
});
exports.createEmpleado = createEmpleado;
// Actualizar un empleado existente
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        let usuario = yield empleado_model_1.default.findByPk(id);
        if (!usuario) {
            usuario = yield admin_model_1.default.findByPk(id);
            if (!usuario) {
                return res.status(404).json({
                    msg: 'Empleado o administrador no encontrado',
                });
            }
        }
        // Verificar si hay una nueva contraseña en el cuerpo de la solicitud
        console.log(body);
        if (body.Contrasena) {
            body.Contraseña = yield bcrypt_1.default.hash(body.Contrasena, 10);
        }
        yield usuario.update(body);
        res.json({
            msg: `${usuario instanceof empleado_model_1.default ? 'Empleado' : 'Administrador'} actualizado correctamente`,
            usuario,
        });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            msg: 'Error al actualizar el empleado o administrador',
            error,
        });
    }
});
exports.updateUser = updateUser;
// Eliminar un empleado
const deleteEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        console.log(id);
        const empleado = yield empleado_model_1.default.findByPk(id);
        if (empleado) {
            // Eliminar los turnos asociados al empleado
            yield turno_model_1.default.destroy({ where: { RutEmpleado: id } });
            // Ahora eliminar el empleado
            yield empleado.destroy();
            res.json({
                msg: 'El empleado fue eliminado con éxito',
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un empleado con ID ${id}`,
            });
        }
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            msg: 'Error al eliminar el empleado',
            error,
        });
    }
});
exports.deleteEmpleado = deleteEmpleado;
const crearAdministrador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Rut, Correo, Contraseña, Nombre } = req.body;
    try {
        // Verificar si el administrador ya existe
        const adminExistente = yield admin_model_1.default.findOne({ where: { Rut } });
        if (adminExistente) {
            return res.status(400).json({ message: 'El administrador ya existe' });
        }
        // Hashear la contraseña
        const hashedPassword = yield bcrypt_1.default.hash(Contraseña, 10);
        // Crear el nuevo administrador
        const nuevoAdmin = yield admin_model_1.default.create({
            Rut,
            Correo,
            Contraseña: hashedPassword,
            Nombre,
            role: 1 // Asegúrate de que el rol sea el de administrador
        });
        res.status(201).json(nuevoAdmin);
    }
    catch (error) {
        console.error('Error al crear el administrador:', error);
        res.status(500).json({ message: 'Error al crear el administrador' });
    }
});
exports.crearAdministrador = crearAdministrador;
