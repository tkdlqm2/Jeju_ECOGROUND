import { createAndDropTable, timestampsColumns } from '../util';

const tableName = 'Deal';
const defineTable = Sequelize => ({

  id: {
    allowNull    : false,
    primaryKey   : true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },

  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'User',
      key: 'id',
    },
  },

  hash: {
    type: Sequelize.STRING
  },
  ...timestampsColumns(Sequelize)
});

export default createAndDropTable(tableName, defineTable);