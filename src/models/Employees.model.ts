import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/client.database';
import Companies from './Companies.model';

class Employees extends Model {
  public id!: number;
  public id_company!: number;
  public rut_employee!: string;
  public full_name!: string;
  public email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Employees.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_company: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Companies,
        key: 'id',
      },
    },
    rut_employee: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    tableName: 'employees',
    sequelize,
  }
);

Employees.belongsTo(Companies, {
  foreignKey: 'id_company',
});

export default Employees;