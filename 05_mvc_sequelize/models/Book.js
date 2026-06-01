const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')
const Category = require('../models/category')

const Book = sequelize.define('Book', {
    isbn: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      maxlength: 13,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      maxlength: 100,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      maxlength: 100,
    },
    publish_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      maxlength: 300,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: true,
      maxlength: 100,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    tableName: 'book',
    timestamps: true,
  }
)

Category.hasMany(Book, { foreignKey: 'category_id', as: 'books' });
Book.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

module.exports = Book;