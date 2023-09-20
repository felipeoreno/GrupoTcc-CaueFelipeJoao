//UserBooks.js
const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const UserBooks = db.define('UserBooks', {
  favorite: {
    type: DataTypes.BOOLEAN
  },
  read: {
    type: DataTypes.BOOLEAN
  },
  toRead: {
    type: DataTypes.BOOLEAN
  },
  reading: {
    type: DataTypes.BOOLEAN
  },
  reReading: {
    type: DataTypes.BOOLEAN
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2)
  }
})

module.exports = UserBooks