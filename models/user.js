'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type:DataTypes.STRING,
      allowNull:true
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull:true
    },
    email: {
      type:DataTypes.STRING,
      allowNull:true,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password:{
      type:DataTypes.STRING,
      validate: {
        min: 8
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    // defaultScope: {
    //   attributes: {
    //     exclude: ['password']
    //   }
    // }
  },
  
  );
  
  User.beforeCreate((user) => {
    return hashPassword(user);
  });
  
  User.beforeUpdate((user) => {
    if (user.changed('password')) {
      return hashPassword(user);
    }})
  return User;
};

async function hashPassword(user) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
}