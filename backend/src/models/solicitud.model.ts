import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';

class Solicitud extends Model {
  public Id!: number;
  public Tipo!: string;
  public Archivo!: Buffer;
  public Fecha!: Date;
  public Descripcion!: string;
  public Respuesta!: string | null;
}

Solicitud.init({
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Tipo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Archivo: {
    type: DataTypes.BLOB('medium'),
    allowNull: true,
  },
  Fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Descripcion: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Respuesta: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'Solicitud',
  timestamps: false,
});



export default Solicitud;
