const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unsigned: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      maxlength: 60,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      maxlength: 150,
    }
  },
  {
    tableName: 'category',
    timestamps: true,
  }
)

module.exports = Category;