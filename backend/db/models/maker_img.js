'use strict';

const tableConfig = (sequelize) => {
  return {
    tableName: 'MakerImage',
    sequelize,
    imestamps: true,
    paranoid: true,
    name: {
      singular: 'MakerImage',
      plural: 'MakerImages',
    },
  }
};

module.exports = (sequelize, DataTypes) => {
  const MakerImage = sequelize.define('MakerImage', {
    makerId     : DataTypes.INTEGER,
    order       : DataTypes.INTEGER,
    imgURL      : DataTypes.STRING,
  }, tableConfig(sequelize));

  MakerImage.associate = models => {

  };

  // [1] MakersImg 생성
  MakerImage.create = function(param) {
    // const { makerId, order, imgURL } = param;
    const makersImg = new this(param);
    return makersImg.save()
  };
  return MakerImage;
};