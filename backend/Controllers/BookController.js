const Book = require('../Model/Book')
const User = require('../Model/User')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const jwt = require('jsonwebtoken')
const ImageBook = require('../Model/ImageBook')

module.exports = class BookController {
  /*==================CRIAR LIVRO==================*/
  static async create(req, res) {
    const { id, title, subtitle, authors, categories, description, published_year, num_pages } = req.body

    //recebendo imagem do livro
    let thumbnail = ''
    if (req.file) {
      thumbnail = req.file.filename
    }

    if (!id) {
      res.status(422).json({ message: 'O código ISBN do livro é obrigatório' })
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
    if (!thumbnail) {
      res.status(422).json({ message: 'A capa do livro é obrigatória' })
      return
    }
    if (!description) {
      description = 'Não descrição disponível para este livro'
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

    //criando o livro
    const book = new Book({
      id: id,
      title: title,
      subtitle: subtitle,
      authors: authors,
      categories: categories,
      thumbnail: thumbnail,
      description: description,
      published_year: published_year,
      num_pages: num_pages
    });

    try {
      // Save the book to the database
      const newBook = await book.save();

      // PODE SER USADO DEPOIS PRA EXIBIR MAIS FOTOS DO LIVRO
      // Handle image uploads
      // const images = req.files;
      // if (images && images.length > 0) {
      //   // Save each image to the ImageBook table
      //   for (let i = 0; i < images.length; i++) {
      //     const filename = images[i].filename;
      //     const newImageBook = new ImageBook({ image: filename, BookId: newBook.id });
      //     await newImageBook.save();
      //   }
      // }

      res.status(201).json({ message: 'Livro cadastrado com sucesso', newBook });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  /*==================VER TODOS LIVROS==================*/
  static async getAll(req, res) {
    const books = await Book.findAll({
      order: [['createdAt', 'DESC']],
      include: ImageBook
    });

    res.status(200).json({ books: books });
  }

  /*==================VER TODOS LIVROS DO USUÁRIO==================*/
  static async getAllUserBooks(req, res) {
    //encontrando o usuario logado
    let currentUser
    const token = getToken(req)
    const decoded = jwt.verify(token, 'nossosecret')
    currentUser = await User.findByPk(decoded.id)
    currentUser.password = undefined
    const currentUserId = currentUser.id

    const books = await Book.findAll({
      where: { userId: currentUserId },
      order: [['createdAt', 'DESC']],
      include: ImageBook
    })

    res.status(200).json({ books })

  }

  /*==================VER LIVROS POR ISBN==================*/
  static async getBookById(req, res) {
    const id = req.params.id

    if (isNaN(id)) {
      res.status(422).json({ message: 'ID Inválido' })
      return
    }
    //get book by id
    const book = await Book.findByPk(id, { include: ImageBook });

    //validando se o ID é valido
    if (!book) {
      res.status(422).json({ message: 'O ISBN não existe' })
      return
    }

    res.status(200).json({ book: book })
  }

  /*==================REMOVER LIVROS POR ISBN==================*/
  static async removeBookById(req, res) {
    const id = req.params.id

    if (isNaN(id)) {
      res.status(422).json({ message: 'ID Inválido' })
      return
    }
    //get book by id
    const book = await Book.findByPk(id)

    //validando se o ID é valido
    if (!book) {
      res.status(422).json({ message: 'Book não existe' })
      return
    }

    //checar se o usuario logado registrou o book
    let currentUser
    const token = getToken(req)
    const decoded = jwt.verify(token, 'nossosecret')
    currentUser = await User.findByPk(decoded.id)
    currentUser.password = undefined
    const currentUserId = currentUser.id

    // if (Number(book.userId) !== Number(currentUserId)) {
    //     res.status(422).json({ message: 'ID inválido' })
    //     return
    // }

    await Book.destroy({ where: { id: id } })

    res.status(200).json({ message: 'Book removido com sucesso' })
  }

  /*==================EDITAR LIVRO==================*/
  static async updateBook(req, res) {
    const id = req.params.id
    const { name, age, weight, color } = req.body

    const updateData = {}
    const book = await Book.findByPk(id);

    if (!book) {
      res.status(404).json({ message: "Book não existe!" });
      return;
    }

    //pegando o dono do book
    let currentUser
    const token = getToken(req)
    const decoded = jwt.verify(token, 'nossosecret')
    currentUser = await User.findByPk(decoded.id)

    if (book.UserId !== currentUser.id) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    } else {
      updateData.name = name
    }
    if (!age) {
      res.status(422).json({ message: "A idade é obrigatória!" });
      return;
    } else {
      updateData.age = age
    }
    if (!weight) {
      res.status(422).json({ message: "O peso é obrigatório!" });
      return;
    } else {
      updateData.weight = weight
    }
    if (!color) {
      res.status(422).json({ message: "A cor é obrigatória!" });
      return;
    } else {
      updateData.color = color
    }



    const images = req.files
    if (!images || images.length === 0) {
      res.status(422).json({ message: "As imagens são obrigatórias!" });
      return;
    } else {
      // Atualizar as imagens do book
      const imageFilenames = images.map((image) => image.filename);
      // Remover imagens antigas
      await ImageBook.destroy({ where: { BookId: book.id } });
      // Adicionar novas imagens
      for (let i = 0; i < imageFilenames.length; i++) {
        const filename = imageFilenames[i];
        const newImageBook = new ImageBook({ image: filename, BookId: book.id });
        await newImageBook.save();
      }

    }

    await Book.update(updateData, { where: { id: id } });

    res.status(200).json({ message: "att com successo!" })
  }

  /*==================NÃO SEI AINDA VOU TER Q MUDAR (PODE SER ADICIONAR LIVRO À BIBLIOTECA DO USUÁRIO)==================*/
  static async schedule(req, res) {
    const id = req.params.id;

    const book = await Book.findByPk(id);

    if (!book) {
      res.status(404).json({ message: "Book não existe!" });
      return;
    }

    //checar se o usuario logado registrou o book
    let currentUser
    const token = getToken(req)
    const decoded = jwt.verify(token, 'nossosecret')
    currentUser = await User.findByPk(decoded.id)

    if (book.userId === currentUser.id) {
      res.status(422).json({ message: "O book já é seu" });
      return;
    }

    //checar se o usuario ja agendou a visita

    if (book.adopter) {
      if (book.adopter === currentUser.id) {
        res.status(422).json({ message: "Voce ja agendou a visita" });
        return;
      }
    }

    console.log(book.adopter, ' = ', currentUser.id)
    //adicioar user como adontante do book
    book.adopter = currentUser.id

    await book.save()

    res.status(200).json({ message: `Visita agendada por ${currentUser.name}` })
  }

  /*==================MESMA COISA==================*/
  static async concludeAdoption(req, res) {
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
  }

  /*==================VER A BIBLIOTECA DO USUÁRIO==================*/
  static async getAllUserAdoptions(req, res) {

    //get usuario pelo token
    let currentUser
    const token = getToken(req)
    const decoded = jwt.verify(token, 'nossosecret')
    currentUser = await User.findByPk(decoded.id)

    const books = await Book.findAll({
      where: { adopter: currentUser.id },
      order: [['createdAt', 'DESC']],
      include: [{ model: User, attributes: ['name', 'phone'] }, ImageBook]
    });
    ;

    res.status(200).json({
      books,
    })

  }
}