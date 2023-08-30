//model/ImageBook.js
const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Book = require('./Book')

const ImageBook = db.define('image_book', {
  image: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

//a imagem pertence a 1 pet
// ImageBook.belongsTo(Book)
//um pet tem varias imagens
// Book.hasMany(ImageBook)

// module.exports = ImageBook