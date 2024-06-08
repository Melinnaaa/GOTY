import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connection';

class Administrador extends Model {
  public Rut!: string;
  public Correo!: string;
  public Contraseña!: string;
  public Nombre!: string;
  public role!: number; // Nuevo atributo role
  public Id!: number;
  public idRecurso!: number | null;
  public Mes!: number | null;
  public Año!: number | null;
}

Administrador.init({
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
    defaultValue: 1, // Valor por defecto para administradores
  },
}, {
  sequelize,
  tableName: 'Administrador',
  timestamps: false,
});

export default Administrador;
