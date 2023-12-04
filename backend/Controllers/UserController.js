const User = require('../Model/User');
const UserFollows = require('../Model/UserFollows');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserById = require('../helpers/get-user-by-token');
const changeFollowers = require('../helpers/change-followers');

module.exports = class UserController {
  /*==================CRIAR USUÁRIO==================*/
  static async register(req, res) {
    const { name, email, password, phone, confirmpassword } = req.body;
    let { level } = req.body;
    let image = '';
    if (req.file) {
      image = req.file.filename;
    } else {
      image = 'standard.png';
    }

    //validações
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório' });
      return;
    }
    if (!email) {
      res.status(422).json({ message: 'O email é obrigatório' });
      return;
    }
    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória' });
      return;
    }
    if (!confirmpassword) {
      res.status(422).json({ message: 'Confirme a senha' });
      return;
    }
    if (!phone) {
      res.status(422).json({ message: 'O número de telefone é obrigatório' });
      return;
    }
    if (!level) {
      level = 0;
    }
    if (password !== confirmpassword) {
      res.status(422).json({ message: 'As senhas não são iguais. Tente novamente.' });
      return;
    }

    //criar a senha
    //criar a criptografia
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //Checar se o usuario existe 
    const userExists = await User.findOne({ where: { email: email } });

    if (userExists) {
      res.status(422).json({ message: 'Email já cadastrado' });
      return;
    }

    const user = new User({
      name: name,
      email: email,
      image: image,
      password: passwordHash,
      phone: phone,
      level: level
    });

    try {
      //criando o usuario no banco
      const newUser = await user.save();
      //entregar o token para o novo user
      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } //funcionando

  /*==================FAZER LOGIN==================*/
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: 'O email é obrigatório' });
      return;
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      res.status(422).json({ message: 'Não existe um usuário com este e-mail' });
      return;
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória' });
      return;
    }

    //checar se o password é igual a senha do banco
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({ message: 'Senha incorreta' });
      return;
    }

    await createUserToken(user, req, res);
  } //funcionando

  /*==================VER PERFIL DO USUÁRIO LOGADO==================*/
  static async checkCurrentUser(req, res) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);

      const decoded = jwt.verify(token, 'nossosecret');

      currentUser = await User.findByPk(decoded.id);

      currentUser.password = undefined;
    } else {
      res.status(422).json({ message: 'Você não está logado. Faça login ou crie uma conta para ver seu perfil.' });
      return;
    }

    res.status(200).send(currentUser);
  } // funcionando

  /*==================VER PERFIL DO USUÁRIO POR ID==================*/
  static async getUserById(req, res) {
    const id = req.params.id;

    const user = await User.findByPk(id, {
      where: { id: id }
    })

    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado' });
      return;
    }

    user.password = undefined;

    res.status(200).json({ user });
  } // funcionando

  /*==================EDITAR USUÁRIO==================*/
  static async editUser(req, res) {

    //checar se o usuario exite
    const token = getToken(req);
    const decoded = jwt.verify(token, 'nossosecret');
    let currentUser;

    if (decoded.id) {
      currentUser = await User.findByPk(decoded.id);
    } else {
      res.status(422).json({ message: 'Login inválido.' });
      return;
    }

    //receber os dados nas variaves
    const { name, email, phone, oldpassword, newpassword, confirmnewpassword } = req.body;

    //recebendo imagem do usuario
    let image = '';
    if (req.file) {
      image = req.file.filename;
    }

    //validações de campos vazios
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório' });
      return;
    }

    if (!email) {
      res.status(422).json({ message: 'O email é obrigatório' });
      return;
    }

    const userExists = await User.findOne({ where: { email: email } });
    if (currentUser.email !== email && userExists) {
      res.status(422).json({ message: 'Por favor utilize outro email.' });
      return;
    }

    if (!phone) {
      res.status(422).json({ message: 'O phone é obrigatório' });
      return;
    }

    //checa se a senha antiga do usuário está correta
    const checkPassword = await bcrypt.compare(oldpassword, currentUser.password);

    if (!checkPassword) {
      res.status(422).json({ message: 'Senha incorreta' });
      return;
    }

    const userToUpdate = await User.findByPk(currentUser.id);

    if (!userToUpdate) {
      res.status(422).json({ message: 'Usuario não encontrado' });
      return;
    }

    userToUpdate.name = name;
    userToUpdate.email = email;
    userToUpdate.phone = phone;
    userToUpdate.image = image;

    if (newpassword !== confirmnewpassword) {
      res.status(422).json({ message: 'As senhas não batem' });
      return;
    } else if (newpassword === confirmnewpassword && newpassword != null) {
      //criptografando senha
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(newpassword, salt);

      userToUpdate.password = passwordHash;
    }

    try {
      await userToUpdate.save();
      res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } // funcionando

  /*==================SEGUIR USUÁRIO==================*/
  static async followUser(req, res) {
    const followedUserId = req.params.id;

    const followedUser = await User.findByPk(followedUserId);

    if (!followedUser) {
      res.status(404).json({ message: "Usuário não existe!" });
      return;
    }

    let currentUser;
    const token = getToken(req);
    const decoded = jwt.verify(token, 'nossosecret');
    currentUser = await User.findByPk(decoded.id);

    const currentUserFollowing = await UserFollows.findAll({
      where: {
        followerId: currentUser.id
      }
    })

    if (currentUserFollowing.some(userFollowing => userFollowing.followedId == followedUser.id)) {
      res.status(422).json({ message: `Você já segue ${followedUser.name}!` });
      return;
    }

    try {
      const newUserFollowing = await UserFollows.create({
        followerId: currentUser.id,
        followedId: followedUser.id
      });

      changeFollowers(currentUser, followedUser, 1, 1);

      console.log('Seguidor adicionado, nova linha: ', newUserFollowing);
      res.status(200).json({ message: `Você está seguindo ${followedUser.name}!` });
    } catch (error) {
      console.error('Erro ao adicionar seguidor: ', error);
      res.status(422).json({ message: `Erro ao seguir ${followedUser.name}: ${error}` });
    }
  }

  /*==================REMOVER USUÁRIOS POR ID==================*/
  static async removeUserById(req, res) {

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

    //get user by id
    const user = await User.findByPk(id);

    //validando se o ID é valido
    if (!user) {
      res.status(422).json({ message: 'O usuário não existe' });
      return;
    }

    await User.destroy({ where: { id: id } });

    res.status(200).json({ message: 'Usuário removido com sucesso' });
  } //funcionando

  /*==================VER TODOS USUÁRIOS (PARA TESTE APENAS)==================*/
  static async getAll(req, res) {
    const users = await User.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({ users: users });
  }
}