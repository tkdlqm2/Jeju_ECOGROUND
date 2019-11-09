'use strict';

const tableConfig = (sequelize) => {
  return {
    tableName: 'Maker',
    sequelize,
    imestamps: true,
    paranoid: true,
    name: {
      singular: 'Maker',
      plural: 'Makers',
    },
  }
};

module.exports = (sequelize, DataTypes) => {
  const Maker = sequelize.define('Maker', {
    userId     : DataTypes.INTEGER,
    title      : DataTypes.STRING,
    description: DataTypes.STRING,
    price      : DataTypes.INTEGER,
    targetKlay : DataTypes.INTEGER,
    DDay       : DataTypes.INTEGER
}, tableConfig(sequelize));

  Maker.associate = models => {
    Maker.belongsToMany(models.MakerImage, {
      through: 'MakerToMakerImg',
      foreignKey: 'makerId'
    })
  };

  // [1] Maker 생성
  Maker.create = function(param) {
    // const { userId, title, description, price, targetKlay, DDay } = param;
    const maker = new this(param);
    return maker.save()
  };

  return Maker;
};