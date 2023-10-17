const Book = require('../Model/Book')
const User = require('../Model/User')
const UserBooks = require('../Model/UserBooks')
//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
//libs
const jwt = require('jsonwebtoken')
// const ImageBook = require('../Model/ImageBook')

module.exports = class BookController {
  /*==================CRIAR LIVRO==================*/
  static async create(req, res) {
    console.log('--------INICIO----------\nreq:', req);
    console.log('files: ', req);

    //pegando o usuário
    let currentUser;
    const token = getToken(req);
    const decoded = jwt.verify(token, 'nossosecret');
    currentUser = await User.findByPk(decoded.id);

    if (currentUser.level !== 1) {
      res.status(422).json({ message: "Você não tem permissão para executar esta ação!" });
      return;
    }

    const { isbn, title, subtitle, categories, published_year, num_pages } = req.body;
    let { authors, description } = req.body;
    console.log('id: ', isbn);
    console.log('title: ', title);

    //recebendo imagem do livro
    let thumbnail = ''
    if (req.files) {
      thumbnail = req.files
    } else {
      thumbnail = 'standardThumbnail.jpg';
    }
    console.log('imagem: ', thumbnail)

    if (!isbn) {
      res.status(422).json({ message: 'O código ISBN do livro é obrigatório' })
      return
    }

    const books = await Book.findAll({
      where: {
        id: isbn
      }
    });
    if (books.length > 0) {
      res.status(422).json({ message: `Já existe um livro com o código ISBN ${isbn}` })
      return
    }

    if (!title) {
      res.status(422).json({ message: 'O título é obrigatório' })
      return
    }
    if (!authors) {
      authors = 'Anônimo'
    }
    if (!categories) {
      res.status(422).json({ message: 'As categorias do livro são obrigatórias' })
      return
    }
    // if (!thumbnail) {
    //   res.status(422).json({ message: 'A capa do livro é obrigatória' })
    //   return
    // } RESOLVER DEPOIS
    if (!description) {
      description = 'Não há descrição disponível para este livro'
    }
    if (!published_year) {
      res.status(422).json({ message: 'O ano de publicação é obrigatório' })
      return
    }
    if (!num_pages) {
      res.status(422).json({ message: 'O número de páginas é obrigatório' })
      return
    }

    //pegando o dono do book
    // let currentUser
    // const token = getToken(req)
    // const decoded = jwt.verify(token, 'nossosecret')
    // currentUser = await User.findByPk(decoded.id)

    const image = req.files;
    if (image && image.length > 0) {
      // Save each image to the ImageBook table
      for (let i = 0; i < images.length; i++) {
        const filename = images.filename;
        const newBookThumbnail = new ImageBook({ image: filename, BookId: newBook.id });
        await newBookThumbnail.save();
      }
    }

    //criando o livro
    const book = new Book({
      id: isbn,
      title: title,
      subtitle: subtitle,
      authors: authors,
      categories: categories,
      thumbnail: thumbnail.filename,
      description: description,
      published_year: published_year,
      num_pages: num_pages
    });

    try {
      // Save the book to the database
      const newBook = await book.save();

      // PODE SER USADO DEPOIS PRA EXIBIR MAIS FOTOS DO LIVRO
      // Handle image uploads
      // const image = req.files;
      // if (image && image.length > 0) {
      //   // Save each image to the ImageBook table
      //   for (let i = 0; i < images.length; i++) {
      //     const filename = images.filename;
      //     const newBookThumbnail = new ImageBook({ image: filename, BookId: newBook.id });
      //     await newBookThumbnail.save();
      //   }
      // }

      res.status(201).json({ message: 'Livro cadastrado com sucesso', newBook });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } //funcionando -- precisa corrigir a capa

  /*==================VER TODOS LIVROS==================*/
  static async getAll(req, res) {
    const books = await Book.findAll({
      order: [['title', 'ASC']]
    });

    res.status(200).json({ books: books });
  } //funcionando

  /*==================VER LIVROS POR ISBN==================*/
  static async getBookById(req, res) {
    const id = req.params.id

    if (isNaN(id)) {
      res.status(422).json({ message: 'ID Inválido' })
      return
    }
    //get book by id
    const book = await Book.findByPk(id);

    //validando se o ID é valido
    if (!book) {
      res.status(422).json({ message: 'O ISBN não existe' })
      return
    }

    res.status(200).json({ book: book })
  } //funcionando

  /*==================REMOVER LIVROS POR ISBN==================*/
  static async removeBookById(req, res) {

    //checar se o usuario logado tem permissão para excluir
    let currentUser;
    const token = getToken(req);
    const decoded = jwt.verify(token, 'nossosecret');
    currentUser = await User.findByPk(decoded.id);
    currentUser.password = undefined;
    const currentUserLevel = currentUser.level;

    if (currentUserLevel !== 1) {
      res.status(422).json({ message: 'Você não tem permissão para executar esta ação' });
      return;
    }

    const id = req.params.id;

    if (isNaN(id)) {
      res.status(422).json({ message: 'ID Inválido' });
      return;
    }

    //get book by id
    const book = await Book.findByPk(id);

    //validando se o ID é valido
    if (!book) {
      res.status(422).json({ message: 'O livro não existe' });
      return;
    }

    await Book.destroy({ where: { id: id } });

    res.status(200).json({ message: 'Livro removido com sucesso' });
  } //funcionando

  /*==================EDITAR LIVRO==================*/
  static async updateBook(req, res) {
    const bookId = req.params.id;
    const { isbn, title, subtitle, categories, published_year, num_pages } = req.body;
    let { authors, description } = req.body;

    let thumbnail = '';
    if (req.file) {
      thumbnail = req.file.filename;
    } else {
      thumbnail = 'standardThumbnail.jpg';
    }

    const updatedData = {}
    const book = await Book.findByPk(bookId);

    if (!book) {
      res.status(404).json({ message: "Livro não existe!" });
      return;
    }

    //pegando o usuário
    let currentUser;
    const token = getToken(req);
    const decoded = jwt.verify(token, 'nossosecret');
    currentUser = await User.findByPk(decoded.id);

    if (currentUser.level !== 1) {
      res.status(422).json({ message: "Você não tem permissão para executar esta ação!" });
      return;
    }

    if (!isbn) {
      res.status(422).json({ message: "O código ISBN do livro é obrigatório!" });
      return;
    } else {
      updatedData.id = isbn;
    }

    if (!title) {
      res.status(422).json({ message: "O título é obrigatório!" });
      return;
    } else {
      updatedData.title = title;
    }

    updatedData.subtitle = subtitle;

    if (!authors) {
      authors = 'Anônimo';
      updatedData.authors = authors;
    } else {
      updatedData.authors = authors;
    }

    if (!categories) {
      res.status(422).json({ message: "As categorias são obrigatórias!" });
      return;
    } else {
      updatedData.categories = categories;
    }

    updatedData.thumbnail = thumbnail;

    if (!description) {
      description = 'Não há descrição disponível para este livro';
    } else {
      updatedData.description = description;
    }

    if (!published_year) {
      res.status(422).json({ message: "O ano de publicação é obrigatório!" });
      return;
    } else {
      updatedData.published_year = published_year;
    }

    if (!num_pages) {
      res.status(422).json({ message: "O número de páginas é obrigatório!" });
      return;
    } else {
      updatedData.num_pages = num_pages;
    }

    // const images = req.files
    // if (!images || images.length === 0) {
    //   res.status(422).json({ message: "As imagens são obrigatórias!" });
    //   return;
    // } else {
    //   // Atualizar as imagens do book
    //   const imageFilenames = images.map((image) => image.filename);
    //   // Remover imagens antigas
    //   await ImageBook.destroy({ where: { BookId: book.id } });
    //   // Adicionar novas imagens
    //   for (let i = 0; i < imageFilenames.length; i++) {
    //     const filename = imageFilenames[i];
    //     const newImageBook = new ImageBook({ image: filename, BookId: book.id });
    //     await newImageBook.save();
    //   }

    // }

    await Book.update(updatedData, { where: { id: bookId } });

    res.status(200).json({ message: "att com successo!" })
  }

  /*==================ADICIONAR LIVRO À BIBLIOTECA DO USUÁRIO==================*/
  static async addBook(req, res) {
    const bookId = req.params.id;
    const { favorite, read, toRead, reading, reReading, rating } = req.body;

    const book = await Book.findByPk(bookId);

    if (!book) {
      res.status(404).json({ message: "Livro não existe!" });
      return;
    }

    //pega o usuário no banco
    let currentUser
    const token = getToken(req)
    const decoded = jwt.verify(token, 'nossosecret')
    currentUser = await User.findByPk(decoded.id)

    //pega os livros na biblioteca do usuário
    const currentUserBooks = await UserBooks.findAll({
      // attributes: ['BookId'],
      where: {
        UserId: currentUser.id
      }
    })

    //verifica se o livro selecionado pelo usuário já está na sua biblioteca
    if (currentUserBooks.some(userBook => userBook.dataValues.BookId == bookId)) {
      res.status(422).json({ message: "Você já adicionou o livro à sua biblioteca" });
      return;
    }

    try {
      const newUserBook = await UserBooks.create({
        UserId: currentUser.id,
        BookId: bookId,
        favorite: favorite,
        read: read,
        toRead: toRead,
        reading: reading,
        reReading: reReading,
        rating: rating
      });

      console.log('Livro adicionado à biblioteca, nova linha: ', newUserBook);
      res.status(200).json({ message: `Livro adicionado à biblioteca de ${currentUser.name}` });
    } catch (error) {
      console.error('Erro ao adicionar livro: ', error);
      res.status(422).json({ message: `Erro ao adicionar livro à biblioteca: ${error}` });
    }
  } //funcionando

  static async updateAddedBook(req, res) {
    const bookId = req.params.id;
    const { favorite, read, toRead, reading, reReading, rating } = req.body;
    const updatedData = {};
    const book = await Book.findByPk(bookId);

    if (!book) {
      res.status(404).json({ message: "Livro não existe!" });
      return;
    }

    //pega o usuário no banco
    let currentUser
    const token = getToken(req)
    const decoded = jwt.verify(token, 'nossosecret')
    currentUser = await User.findByPk(decoded.id)

    //pega os livros na biblioteca do usuário
    const addedBook = await UserBooks.findAll({
      where: {
        UserId: currentUser.id,
        BookId: bookId
      }
    })

    //verifica se há dados novos a serem inseridos no campo do userbooks
    if (favorite) {
      updatedData.favorite = favorite;
    } else {
      updatedData.favorite = addedBook[0].favorite;
    }

    if (read) {
      updatedData.read = read;
    } else {
      updatedData.read = addedBook[0].read;
    }
    if (toRead) {
      updatedData.toRead = toRead;
    } else {
      updatedData.toRead = addedBook[0].toRead;
    }
    if (reading) {
      updatedData.reading = reading;
    } else {
      updatedData.reading = addedBook[0].reading;
    }
    if (reReading) {
      updatedData.reReading = reReading;
    } else {
      updatedData.reReading = addedBook[0].reReading;
    }
    if (rating) {
      updatedData.rating = rating;
    } else {
      updatedData.rating = addedBook[0].rating;
    }

    try {
      await UserBooks.update(updatedData, {
        where: {
          BookId: bookId,
          UserId: currentUser.id
        }
      });
      console.log('Atualizado Livro na biblioteca, nova linha: ', updatedData);
      res.status(200).json({ message: `Atualizado Livro na biblioteca de ${currentUser.name}` });
    } catch (error) {
      console.error('Erro ao atualizar Livro: ', error);
      res.status(422).json({ message: `Erro ao atualizar Livro: ${error}` });
    }
  } //funcionando

  /*==================MESMA COISA==================*/
  /*static async concludeAdoption(req, res) {
    const id = req.params.id;

    const book = await Book.findByPk(id);
    if (!book) {
      res.status(404).json({ message: "Book não existe!" });
      return;
    }

    let currentUser
    const token = getToken(req)
    const decoded = jwt.verify(token, 'nossosecret')
    currentUser = await User.findByPk(decoded.id)

    if (book.UserId !== currentUser.id) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    book.available = false

    await book.save(); // Salvando a instância do book atualizada.

    res.status(200).json({ message: `Adoção concluída` })
  }*/

  /*==================VER A BIBLIOTECA DO USUÁRIO==================*/
  static async getAllUserBooks(req, res) {

    //get usuario pelo token
    let currentUser
    const token = getToken(req)
    const decoded = jwt.verify(token, 'nossosecret')
    currentUser = await User.findByPk(decoded.id)

    const userBooks = await UserBooks.findAll({
      where: { UserId: currentUser.id },
      order: [['createdAt', 'DESC']]
    });

    const books = [];
    for (let i = 0; i < userBooks.length; i++) {
      books[i] = await Book.findAll({
        where: { id: userBooks[i].BookId }
      });
    }

    res.status(200).json({ books })
  } //funcionando

  static async rateBook(req, res) {
    const bookId = req.params.id;
    const { favorite, read, toRead, reading, reReading, rating } = req.body;

    const book = await Book.findByPk(bookId);

    if (!book) {
      res.status(404).json({ message: "Livro não existe!" });
      return;
    }

    //pega o usuário no banco
    let currentUser
    const token = getToken(req)
    const decoded = jwt.verify(token, 'nossosecret')
    currentUser = await User.findByPk(decoded.id)

    //pega os livros na biblioteca do usuário
    const currentUserBooks = await UserBooks.findAll({
      // attributes: ['BookId'],
      where: {
        UserId: currentUser.id
      }
    })

    //verifica se o livro selecionado pelo usuário já está na sua biblioteca
    if (currentUserBooks.some(userBook => userBook.dataValues.BookId == bookId)) {
      res.status(422).json({ message: "Você já adicionou o livro à sua biblioteca" });
      return;
    }

    try {
      const newUserBook = await UserBooks.create({
        UserId: currentUser.id,
        BookId: bookId,
        favorite: favorite,
        read: read,
        toRead: toRead,
        reading: reading,
        reReading: reReading,
        rating: rating
      });

      console.log('Livro adicionado à biblioteca, nova linha: ', newUserBook);
      res.status(200).json({ message: `Livro adicionado à biblioteca de ${currentUser.name}` });
    } catch (error) {
      console.error('Erro ao adicionar livro: ', error);
      res.status(422).json({ message: `Erro ao adicionar livro à biblioteca: ${error}` });
    }
  }
}