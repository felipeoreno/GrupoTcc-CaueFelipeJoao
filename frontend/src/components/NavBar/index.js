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
    <nav className='navbar bg-info mb-3 shadow-sm'>
      <div className='container'>
        <Link className='navbar-brand ms-2' to='/'>Comunidade de Livros Online</Link>
        {authenticated ? (
          <>
            <div className='vr me-3 mt-2' style={{ height: '2.5rem' }}></div>
            <Link className='me-auto nav-link' to='/users'>Usuários</Link>
          </>
        ) : (null)}
        {/* <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbar_links'>
          <span className='navbar-toggler-icon'></span>
        </button> */}
        <div className='justify-content-end' id='navbar_links'>
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