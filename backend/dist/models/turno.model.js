"use strict";
// models/turno.model.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const empleado_model_1 = __importDefault(require("./empleado.model"));
class Turno extends sequelize_1.Model {
}
Turno.init({
    fecha: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
        primaryKey: true
    },
    RutEmpleado: {
        type: sequelize_1.DataTypes.STRING(12),
        allowNull: false,
        primaryKey: true,
        references: {
            model: empleado_model_1.default,
            key: 'Rut',
        },
    },
}, {
    sequelize: connection_1.default,
    modelName: 'Turno',
    timestamps: false,
});
Turno.belongsTo(empleado_model_1.default, { foreignKey: 'RutEmpleado' });
exports.default = Turno;
