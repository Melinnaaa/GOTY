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
const connection_1 = __importDefault(require("../db/connection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize_1 = require("sequelize");
const login = (Correo, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Iniciando sesión para:', Correo);
        // Ejecutar la consulta para obtener el usuario por correo en la tabla Administrador
        let results = yield connection_1.default.query('SELECT * FROM Administrador WHERE Correo = ?', {
            replacements: [Correo],
            type: sequelize_1.QueryTypes.SELECT
        });
        let user = results.length > 0 ? results[0] : null;
        // Si no se encontró en la tabla Administrador, buscar en la tabla Empleado
        if (!user) {
            results = yield connection_1.default.query('SELECT * FROM Empleado WHERE Correo = ?', {
                replacements: [Correo],
                type: sequelize_1.QueryTypes.SELECT
            });
            user = results.length > 0 ? results[0] : null;
        }
        // Si no se encontró en ninguna tabla, lanzar error
        if (!user) {
            throw new Error('El correo electrónico no existe');
        }
        // Comparar la contraseña ingresada con la contraseña hasheada almacenada
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.Contraseña);
        if (!isPasswordValid) {
            throw new Error('La contraseña es incorrecta');
        }
        return { user };
    }
    catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
});
exports.default = { login };
