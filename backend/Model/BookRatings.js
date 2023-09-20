//BookRatings.js
const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const BookRatings = db.define('BookRatings', {
  rating: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
})

// module.exports = BookRatings
