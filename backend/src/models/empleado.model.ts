import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';

class Empleado extends Model {
  public Rut!: string;
  public Correo!: string;
  public Contraseña!: string;
  public Nombre!: string;
  public role!: number;
}

Empleado.init({
  Rut: {
    type: DataTypes.STRING(12),
    primaryKey: true,
  },
  Correo: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  Contraseña: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  role: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  sequelize,
  tableName: 'Empleado',
  timestamps: false,
});

export default Empleado;
