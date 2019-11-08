import { createAndDropTable, timestampsColumns } from '../util';

const tableName = 'User';
const defineTable = Sequelize => ({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  email: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  ...timestampsColumns(Sequelize)
});

export default createAndDropTable(tableName, defineTable);