// models/turno.model.ts

import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import Empleado from './empleado.model';

class Turno extends Model {
  public fecha!: Date;
  public RutEmpleado!: string;
}

Turno.init({
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    primaryKey: true
  },
  RutEmpleado: {
    type: DataTypes.STRING(12),
    allowNull: false,
    primaryKey: true,
    references: {
      model: Empleado,
      key: 'Rut',
    },
  },
}, {
  sequelize,
  modelName: 'Turno',
  timestamps: false,
});

Turno.belongsTo(Empleado, { foreignKey: 'RutEmpleado' });

export default Turno;
