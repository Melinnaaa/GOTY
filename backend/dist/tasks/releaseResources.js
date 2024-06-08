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
const node_cron_1 = __importDefault(require("node-cron"));
const recurso_model_1 = __importDefault(require("../models/recurso.model"));
const sequelize_1 = require("sequelize");
const releaseResources = () => {
    // Programar la tarea para que se ejecute diariamente a medianoche
    node_cron_1.default.schedule('0 0 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Liberando recursos...');
        try {
            // Obtener la fecha actual
            const today = new Date();
            const formattedToday = today.toISOString().split('T')[0];
            // Buscar los recursos reservados en fechas anteriores a hoy
            const recursosAntiguos = yield recurso_model_1.default.findAll({
                where: {
                    Fecha: {
                        [sequelize_1.Op.lt]: formattedToday,
                    },
                },
            });
            // Liberar los recursos
            for (const recurso of recursosAntiguos) {
                recurso.Disponibilidad = true;
                recurso.Rut = null;
                recurso.Fecha = null;
                yield recurso.save();
            }
            console.log('Recursos liberados');
        }
        catch (error) {
            console.error('Error al liberar recursos:', error);
        }
    }));
};
exports.default = releaseResources;
