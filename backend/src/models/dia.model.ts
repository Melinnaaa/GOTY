import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';

class Dia extends Model {
  public numDia!: number;
}

Dia.init({
  numDia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  sequelize,
  tableName: 'Día',
  timestamps: false,
});

export default Dia;
