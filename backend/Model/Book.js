const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const Book = db.define('Book', {
  id:{
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
  },
  title:{
      type: DataTypes.TEXT,
      allowNull: false
  },
  subtitle:{
      type: DataTypes.TEXT,
      allowNull: true
  },
  authors:{
    type: DataTypes.TEXT,
    allowNull: false
  },
  categories:{
      type: DataTypes.TEXT,
      allowNull: false
  },
  thumbnail:{
      type: DataTypes.TEXT,
      allowNull: true
  },
  description:{
      type: DataTypes.TEXT,
      allowNull: true
  },
  published_year:{
      type: DataTypes.INTEGER,
      allowNull: true
  },
  average_rating:{
      type: DataTypes.DOUBLE,
      allowNull: true
  },
  num_pages:{
      type: DataTypes.INTEGER,                                                                                                                                                      
      allowNull: true
  },
  ratings_count:{
      type: DataTypes.INTEGER,
      allowNull: true
  },
  createdAt:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  }
}, {
  timestamps: true,
  createdAt: false,
  updatedAt: false
})

// Book.belongsTo(User)
User.hasMany(Book)

module.exports = Book
