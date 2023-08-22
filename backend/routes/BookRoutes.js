//BookRoutes
const router = require('express').Router()
const BookController = require('../Controllers/BookController')

//helpers
const verifyToken = require('../helpers/verify-token')
const imageUpload = require('../helpers/image-upload')

//---------------- rotas privadas---------------- 
/*cadastrar um pet*/
router.post('/create', verifyToken/*, imageUpload.array('images')*/, BookController.create)
// /* mostrar pets do usuario logado */
// router.get('/mybooks', verifyToken, BookController.getAllUserBooks)
// /* deletar um pet pelo id */
// router.delete('/:id', verifyToken, BookController.removeBookById)
// /* Editar Book */
// router.patch('/:id', verifyToken, imageUpload.array('images'), BookController.updateBook)
// /** Agendar pet */
// router.patch('/schedule/:id', verifyToken, BookController.schedule)
// /** concluir  adoção */
// router.patch('/conclude/:id', verifyToken, BookController.concludeAdoption)
// /* pet adotados pelo user*/
// router.get('/myadoptions', verifyToken, BookController.getAllUserAdoptions)

//---------------- rotas publicas ----------------
/*listar todos os pets*/
router.get('/', BookController.getAll)
/*listar pet por id*/
router.get('/:id', BookController.getBookById)

module.exports = router