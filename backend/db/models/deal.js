'use strict';

const tableConfig = (sequelize) => {
  return {
    tableName: 'Maker',
    sequelize,
    imestamps: true,
    paranoid: true,
    name: {
      singular: 'Deal',
      plural: 'Deals',
    },
  }
};

module.exports = (sequelize, DataTypes) => {
  const Deal = sequelize.define('Deal', {
    userId     : DataTypes.INTEGER,
    hash       : DataTypes.STRING,
  }, tableConfig(sequelize));

  // [1] Maker 생성
  Deal.create = function(param) {
    // const { userId, title, description, price, targetKlay, DDay } = param;
    const maker = new this(param);
    return maker.save()
  };

  return Deal;
};