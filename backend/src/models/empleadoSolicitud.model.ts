import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import Empleado from './empleado.model';
import Solicitud from './solicitud.model';

class EmpleadoSolicitud extends Model {
  public Rut!: string;
  public Id!: number;
}

EmpleadoSolicitud.init({
  Rut: {
    type: DataTypes.STRING(12),
    primaryKey: true,
    references: {
      model: Empleado,
      key: 'Rut',
    },
  },
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Solicitud,
      key: 'Id',
    },
  },
}, {
  sequelize,
  tableName: 'EmpleadoSolicitud',
  timestamps: false,
});

export default EmpleadoSolicitud;
