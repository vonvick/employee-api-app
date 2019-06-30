import Sequelize from 'sequelize';

class Employee extends Sequelize.Model {
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
          unique: {
            args: true,
            msg: 'Oops. There is an existing employee with this email address.',
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

export default Employee;
