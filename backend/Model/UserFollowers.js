//UserFollowers.js
const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const UserFollowers = db.define('UserFollowers', {
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
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
})

module.exports = UserFollowers
