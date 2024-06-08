"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const empleado_model_1 = __importDefault(require("./empleado.model"));
const solicitud_model_1 = __importDefault(require("./solicitud.model"));
class EmpleadoSolicitud extends sequelize_1.Model {
}
EmpleadoSolicitud.init({
    Rut: {
        type: sequelize_1.DataTypes.STRING(12),
        primaryKey: true,
        references: {
            model: empleado_model_1.default,
            key: 'Rut',
        },
    },
    Id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: solicitud_model_1.default,
            key: 'Id',
        },
    },
}, {
    sequelize: connection_1.default,
    tableName: 'EmpleadoSolicitud',
    timestamps: false,
});
exports.default = EmpleadoSolicitud;
