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
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email   : DataTypes.STRING,
    name    : DataTypes.STRING,
    password: DataTypes.STRING

  }, tableConfig(sequelize));
  
  User.associate = models => {
    User.belongsToMany(models.Maker, {
      through: 'UserToMaker',
      foreignKey: 'userId'
    })
  };

  // create new User document
  User.create = function(email, name, password) {
    const user = new this({
        email, name, password
    });
    return user.save()
  };

  // find one user by using username
  User.findOneByUserEmail = function (email) {
    return User.findOne({
      where : { email: email }
    })
  };

  // verify the password of the User documment
  User.verify = function(userObj, password) {
    return userObj.password === password
  };

  User.assignAdmin = function(user) {
    user.admin = true;
    return user.save()
  };
  
  return User;
};