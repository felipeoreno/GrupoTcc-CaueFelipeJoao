//db/conn.js

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('com_livros', 'root', 'sucesso', { //senha é sucesso no  senai
  host: 'localhost',
  dialect: 'mysql'
})

try {
  sequelize.authenticate()
  console.log('Conectado ao banco!!!!!!')
} catch (error) {
  console.log('Não foi possivel conectar: ', error)
}

module.exports = sequelize