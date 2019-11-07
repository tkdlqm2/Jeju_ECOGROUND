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
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING

  }, tableConfig(sequelize));
  
  User.associate = function(models) {
    // associations can be defined here
  };

  // create new User document
  User.create = function(email, name, password) {
    const user = new this({
        email, name, password
    });

    // return the Promise
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

  User.assignAdmin = function() {
    this.admin = true;
    return this.save()
  };
  
  return User;
};