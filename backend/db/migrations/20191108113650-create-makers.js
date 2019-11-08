import { createAndDropTable, timestampsColumns } from '../util';

const tableName = 'Maker';
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

  title: {
    type: Sequelize.STRING
  },

  description: {
    type: Sequelize.STRING
  },

  price: {
    type: Sequelize.INTEGER
  },

  targetKlay: {
    type: Sequelize.INTEGER
  },
  DDay : {
    type: Sequelize.INTEGER
  },
  ...timestampsColumns(Sequelize)
});

export default createAndDropTable(tableName, defineTable);