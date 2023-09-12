//change-followers.js
const User = require('../Model/User');

async function changeFollowers(follower, followed, count) {
  //atualiza o número de usuários seguidos do seguidor
  const newFollowing = follower.following + count;
  await User.update({ following: newFollowing }, {
    where: {
      id: follower.id
    }
  })

  //atualiza o número de seguidores do usuário seguido
  const newFollowers = followed.followers + count;
  await User.update({ followers: newFollowers }, {
    where: {
      id: followed.id
    }
  });
}

module.exports = changeFollowers
