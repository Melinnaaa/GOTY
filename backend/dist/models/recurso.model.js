"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const empleado_model_1 = __importDefault(require("./empleado.model"));
class Recurso extends sequelize_1.Model {
}
Recurso.init({
    idRecurso: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Disponibilidad: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    Rut: {
        type: sequelize_1.DataTypes.STRING(12),
        allowNull: true,
        references: {
            model: empleado_model_1.default,
            key: 'Rut',
        },
    },
    Fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    Tipo: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'Recurso',
    timestamps: false,
});
Recurso.belongsTo(empleado_model_1.default, { foreignKey: 'Rut' });
exports.default = Recurso;
