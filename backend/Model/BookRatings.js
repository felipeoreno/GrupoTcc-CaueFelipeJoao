//BookRatings.js
const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const BookRatings = db.define('BookRatings', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Books',
      key: 'id'
    }
  },
  rating: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}) //parei aqui 19/09

BookRatings.belongsTo(User, { foreignKey: 'userId' });

module.exports = BookRatings
