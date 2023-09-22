//verify-level.js
const jwt = require('jsonwebtoken'); //jwt ele gerencia o token
const getToken = require('./get-token');
const User = require('../Model/User');

//verificar se o nível do usuário é 1 (adm)
async function verifyLevel(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Acesso Negado' });
  }

  const token = getToken(req)

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado' });
  }

  const decoded = jwt.verify(token, 'nossosecret');
  const userId = decoded.id;
  const user = await User.findOne({ id: userId });
  if (user.level) {
    next();
  } else {
    return res.status(400).json({ message: 'Permissão não concedida' });
  }
}

module.exports = verifyLevel;
