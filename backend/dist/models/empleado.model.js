"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Empleado extends sequelize_1.Model {
}
Empleado.init({
    Rut: {
        type: sequelize_1.DataTypes.STRING(12),
        primaryKey: true,
    },
    Correo: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false,
    },
    Contraseña: {
        type: sequelize_1.DataTypes.STRING(60),
        allowNull: false,
    },
    Nombre: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'Empleado',
    timestamps: false,
});
exports.default = Empleado;
