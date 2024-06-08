"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Solicitud extends sequelize_1.Model {
}
Solicitud.init({
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Tipo: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    Archivo: {
        type: sequelize_1.DataTypes.BLOB('medium'),
        allowNull: true,
    },
    Fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    Descripcion: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    Respuesta: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'Solicitud',
    timestamps: false,
});
exports.default = Solicitud;
