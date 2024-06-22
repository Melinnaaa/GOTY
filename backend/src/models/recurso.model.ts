import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import Empleado from './empleado.model';

class Recurso extends Model {
  public idRecurso!: number;
  public Disponibilidad!: boolean;
  public Rut!: string | null;
  public Fecha!: Date | null;
  public Tipo!: string; 
}

Recurso.init({
  idRecurso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Disponibilidad: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Rut: {
    type: DataTypes.STRING(12),
    allowNull: true,
    references: {
      model: Empleado,
      key: 'Rut',
    },
  },
  Fecha: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Tipo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Recurso',
  timestamps: false,
});

Recurso.belongsTo(Empleado, { foreignKey: 'Rut' });

export default Recurso;
