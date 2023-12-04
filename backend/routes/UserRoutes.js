const router = require('express').Router();
const UserController = require('../Controllers/UserController');
//helpers
const verifyLevel = require('../helpers/verify-level');
const verifyToken = require('../helpers/verify-token');
const imageUpload = require('../helpers/image-upload');

//rota para criar "registrar" um usuario
//rotas publicas
router.post('/register', imageUpload.single('image'), UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', verifyToken, UserController.checkCurrentUser)
router.get('/:id', UserController.getUserById)

//rotas protegidas, só acessar caso esteja logado!!!
router.patch('/edit', verifyToken, imageUpload.single('image'), UserController.editUser)
router.post('/follow/:id', verifyToken, UserController.followUser)
router.get('/', verifyToken, UserController.getAll)

/* deletar um usuário pelo id */
router.delete('/:id', verifyLevel, UserController.removeUserById);

module.exports = router
