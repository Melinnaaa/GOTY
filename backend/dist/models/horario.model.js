"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Horario extends sequelize_1.Model {
}
Horario.init({
    Mes: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    Año: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'Horario',
    timestamps: false,
});
exports.default = Horario;
