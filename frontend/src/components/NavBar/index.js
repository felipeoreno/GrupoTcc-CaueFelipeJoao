import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../utils/api';
//Contexto
import { Context } from '../../context/UserContext';

function NavBar() {
  const location = useLocation();
  const { authenticated, logout } = useContext(Context)
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.get('/users/checkuser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }).then((response) => {
        setUser(response.data)
      })
    }
  }, []);

  return (
    <nav className='navbar navbar-expand bg-info mb-3'>
      <div className='container'>
        <Link className='navbar-brand'>Com. Livros</Link>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbar_links'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse justify-content-end' id='navbar_links'>
          <ul className='navbar nav'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>Home</Link>
            </li>
            {!authenticated ? (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/register'>Registrar</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/login'>Login</Link>
                </li>
              </>
            ) : user.level === 1 ? (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/user/profile'>Perfil</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/books/mybooks'>Meus Livros</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/books/create'>Cadastrar Livro</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/books/edit'>Editar Livro</Link>
                </li>
                <li onClick={logout} className='nav-item'><Link className='nav-link' to='/'>Sair</Link></li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/user/profile'>Perfil</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/books/mybooks'>Meus Livros</Link>
                </li>
                <li onClick={logout} className='nav-item'><Link className='nav-link' to='/'>Sair</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar