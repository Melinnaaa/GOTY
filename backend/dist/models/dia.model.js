"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Dia extends sequelize_1.Model {
}
Dia.init({
    numDia: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'Día',
    timestamps: false,
});
exports.default = Dia;
