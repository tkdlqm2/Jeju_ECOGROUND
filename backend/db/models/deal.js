'use strict';

const tableConfig = (sequelize) => {
  return {
    tableName: 'Deal',
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
    userId : DataTypes.INTEGER,
    hash   : DataTypes.STRING,
  }, tableConfig(sequelize));

  // [1] Deal 생성
  Deal.create = function(param) {
    // const { userId, hash } = param;
    const deal = new this(param);
    return deal.save()
  };

  return Deal;
};