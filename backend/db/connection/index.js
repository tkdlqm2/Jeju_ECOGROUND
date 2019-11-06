import Sequelize from 'sequelize';
import dbConfig from '../config/config';

export default new Sequelize(dbConfig.development);