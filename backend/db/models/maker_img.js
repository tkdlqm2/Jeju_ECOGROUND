'use strict';

const tableConfig = (sequelize) => {
  return {
    tableName: 'MakerImg',
    sequelize,
    imestamps: true,
    paranoid: true,
    name: {
      singular: 'MakerImg',
      plural: 'MakerImgs',
    },
  }
};

module.exports = (sequelize, DataTypes) => {
  const MakersImg = sequelize.define('MakerImg', {
    makerId     : DataTypes.INTEGER,
    imgURL      : DataTypes.STRING,
  }, tableConfig(sequelize));

  MakersImg.associate = models => {

  };

  // [1] MakersImg 생성
  MakersImg.create = function(param) {
    // const { makerId, imgURL } = param;
    const makersImg = new this(param);
    return makersImg.save()
  };


  return MakersImg;
};