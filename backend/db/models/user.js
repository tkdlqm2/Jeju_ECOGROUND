'use strict';
const tableConfig = (sequelize) => {
  return {
    tableName: 'User',
    sequelize,
    imestamps: true,
    paranoid: true,
    name: {
      singular: 'user',
      plural: 'users',
    },
  }
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING

  }, tableConfig);
  
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};