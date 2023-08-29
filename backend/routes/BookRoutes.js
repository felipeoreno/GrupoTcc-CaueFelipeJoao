//BookRoutes
const router = require('express').Router()
const BookController = require('../Controllers/BookController')

//helpers
const verifyToken = require('../helpers/verify-token')
const imageUpload = require('../helpers/image-upload')

//---------------- rotas privadas---------------- 
/*cadastrar um pet*/
router.post('/create', verifyToken, BookController.create)
// /* mostrar livros do usuário logado */
router.get('/mybooks', verifyToken, BookController.getAllUserBooks)
// /* deletar um pet pelo id */
// router.delete('/:id', verifyToken, BookController.removeBookById)
// /* Editar Book */
router.patch('/:id', verifyToken/*, imageUpload.array('images')*/, BookController.updateBook)
/** Adicionar livro à biblioteca do usuário */
router.post('/addbook/:id', verifyToken, BookController.addBook);
// /** concluir  adoção */
// router.patch('/conclude/:id', verifyToken, BookController.concludeAdoption)
/* Livros na biblioteca do usuário */
router.get('/mybooks', verifyToken, BookController.getAllUserBooks)

//---------------- rotas publicas ----------------
/*listar todos os pets*/
router.get('/', BookController.getAll)
/*listar pet por id*/
router.get('/:id', BookController.getBookById)

module.exports = router