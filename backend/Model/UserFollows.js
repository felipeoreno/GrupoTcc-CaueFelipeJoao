//UserFollows.js
const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const UserFollows = db.define('UserFollows', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  followerId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    },
  },
  followedId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
})

module.exports = UserFollows
