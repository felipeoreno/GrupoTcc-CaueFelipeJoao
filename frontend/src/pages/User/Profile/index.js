import React from 'react';
import api from '../../../utils/api';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Profile() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    api.get('users/checkuser').then((response) => {
      setUser(response.data);
    })
  }, []);

  return (
    <div>
      <h2>Meu Perfil</h2>
      <hr></hr>
      <ul className='list-group col-4'>
        <li className='list-group-item'><img src={`http://localhost:5000/image/users/${user.image}`} className='img-fluid'></img></li>
        <li className='list-group-item'>Nome: {user.name}</li>
        <li className='list-group-item'>E-mail: {user.email}</li>
        <li className='list-group-item'>Telefone: {user.phone}</li>
      </ul>
      <hr></hr>
      <Link to={'/user/profile/edit'}><button className='btn btn-secondary'>Editar perfil</button></Link>
    </div>
  );
}

export default Profile;
