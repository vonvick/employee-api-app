import Sequelize from 'sequelize';

class EmployeeModel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
          set(value) {
            this.setDataValue('first_name', value ? value.trim() : value);
          }
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: false,
          set(value) {
            this.setDataValue('last_name', value ? value.trim() : value);
          }
        },
        email: {
          type: DataTypes.STRING,
          validate: {
            isEmail: true
          },
          allowNull: false,
          set(value) {
            this.setDataValue('email', value ? value.trim() : value);
          }
        },
        phone: {
          type: DataTypes.STRING,
          validate: {
            isNumeric: true
          },
          allowNull: false,
          set(value) {
            this.setDataValue('phone', value ? value.trim() : value);
          }
        }
      },
      { sequelize }
    )
  }
};

export default EmployeeModel;
