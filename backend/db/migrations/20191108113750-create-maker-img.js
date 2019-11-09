import { createAndDropTable, timestampsColumns } from '../util';

const tableName = 'MakerImage';
const defineTable = Sequelize => ({

  id: {
    allowNull    : false,
    primaryKey   : true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },

  makerId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Maker',
      key: 'id',
    },
  },

  order: {
    type: Sequelize.INTEGER
  },

  imgURL: {
    type: Sequelize.STRING
  },
  ...timestampsColumns(Sequelize)
});

export default createAndDropTable(tableName, defineTable);