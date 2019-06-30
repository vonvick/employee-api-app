import Sequelize from 'sequelize';
import config from '../config/sequelize.config';

// Models
import Employee from './employee';

const sequelize = new Sequelize(config.url, config);

const models = {
  Employee: Employee.init(sequelize, Sequelize)
};

Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize
}

export default db;
