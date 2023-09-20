const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const User = require('./User')
const UserBooks = require('./UserBooks')
const BookRatings = require('./BookRatings')

const Book = db.define('Books', {
  // id: {
  //   type: DataTypes.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true
  // },
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  subtitle: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  authors: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  categories: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  thumbnail: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  published_year: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  num_pages: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  average_rating: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  ratings_count: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  }
}, {
  timestamps: true,
  createdAt: false,
  updatedAt: false
})

Book.belongsToMany(User, { through: UserBooks })
// Book.hasMany(User, {through: BookRatings})

module.exports = Book
