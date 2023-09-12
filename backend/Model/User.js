//User.js
const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const User = db.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  followers: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    autoIncrement: false
  },
  following: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    autoIncrement: false
  },
  level: {
    type: DataTypes.TINYINT(1),
    allowNull: false
  }
})

User.belongsToMany(User, {
  as: 'Followers',
  foreignKey: 'followerId',
  through: 'UserFollowers'
});

User.belongsToMany(User, {
  as: 'Following',
  foreignKey: 'followedId',
  through: 'UserFollowers'
});

module.exports = User
