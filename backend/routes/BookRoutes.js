//BookRoutes
const router = require('express').Router();
const BookController = require('../Controllers/BookController');

//helpers
const verifyToken = require('../helpers/verify-token');
const imageUpload = require('../helpers/image-upload');

//---------------- rotas privadas---------------- 
/*cadastrar um pet*/
router.post('/create', verifyToken, BookController.create);
/* deletar um livro pelo id */
router.delete('/:id', verifyToken, BookController.removeBookById);
/* Editar Book */
router.patch('/:id', verifyToken/*, imageUpload.array('images')*/, BookController.updateBook);
/** Adicionar livro à biblioteca do usuário */
router.post('/addbook/:id', verifyToken, BookController.addBook);
/* Livros na biblioteca do usuário */
router.get('/mybooks', verifyToken, BookController.getAllUserBooks);
//avaliar livro
router.patch('/addedbook/:id', verifyToken, BookController.updateAddedBook);

//---------------- rotas públicas ----------------
/*listar todos os pets*/
router.get('/', BookController.getAll);
/*listar pet por id*/
router.get('/:id', BookController.getBookById);

module.exports = router;
