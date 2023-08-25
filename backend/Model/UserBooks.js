//UserBooks.js
const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const UserBooks = db.define('UserBooks')

module.exports = UserBooks