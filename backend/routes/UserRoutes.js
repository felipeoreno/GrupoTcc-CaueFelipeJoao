const router = require('express').Router()
const UserController = require('../Controllers/UserController')
//helpers
const verifyToken = require('../helpers/verify-token')
const imageUpload = require('../helpers/image-upload')

//rota para criar "registrar" um usuario
//rotas publicas
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkCurrentUser)
router.get('/:id', UserController.getUserById)

//rotas protegidas, só acessar caso esteja logado!!!
router.patch('/edit/:id', verifyToken, imageUpload.single('image'), UserController.editUser)

//rotas de teste
router.get('/', UserController.getAll)

module.exports = router
