import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';

class Horario extends Model {
  public Mes!: number;
  public Año!: number;
}

Horario.init({
  Mes: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  Año: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  sequelize,
  tableName: 'Horario',
  timestamps: false,
});

export default Horario;
