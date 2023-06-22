'use strict';
const {
  Model
} = require('sequelize');
// const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsTo(models.User, { foreignKey: 'authorId' });
    }
  }
  Book.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};