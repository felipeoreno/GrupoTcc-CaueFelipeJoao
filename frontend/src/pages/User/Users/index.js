//index.js do HOME
import React, { useContext } from 'react';
import { Context } from '../../../context/UserContext';
import api from '../../../utils/api';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const { authenticated } = useContext(Context);
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    api.get('/users').then((response) => {
      setUsers(response.data.users)
    })

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

  async function removeUser(id) {
    const data = await api.delete(`users/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        return err.response.data
      })
    window.location.reload();
    alert(data.message);
  }

  return (
    <section className="container">
      <div className="bg-body-tertiary rounded ps-2 pb-1 mb-2">
        <h1 className='fw-semibold'>Vejá quem está na plataforma</h1>
          <p>Descubra leitores com novos gostos</p>
      </div>
      <div className='container d-flex justify-content-start flex-wrap row g-4'>
        {users.length > 0 && user.level !== 0 ? (
          users.map((user) => (
            <div key={user.id} className='col-3' style={{ height: '30rem' }}>
              <figure className='card p-2 bg-light' key={user.id} style={{ height: '22rem' }}>
                <Link to={`/users/${user.id}`}>
                  <img
                    src={`http://localhost:5000/image/users/${user.image}`}
                    className='card-img-top'
                  // style={{ width: '18rem' }}
                  />
                </Link>
                <figcaption className='card-body'>
                  <h3 className='card-title'><Link className='link-opacity-100-hover link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover' to={`/users/${user.id}`}>{user.name}</Link></h3>
                </figcaption>
                <div>
                  <button className='btn btn-danger' onClick={() => removeUser(user.id)}>Remover usuário</button>
                </div>
              </figure>
            </div>
          ))
        ) : users.length > 0 && user.level === 1 ? (
          users.map((user) => (
            <div className='col-2'>
              <figure className='card p-2' key={user.id} style={{ height: '95%' }}>
                <Link to={`/users/${user.id}`}>
                  <img
                    src={`${user.thumbnail}`}
                    className='card-img-top'
                  // style={{ width: '18rem' }}
                  />
                </Link>
                <figcaption className='card-body'>
                  <h3 className='card-title'>{user.name}</h3>
                  <p className='card-text'>
                    <Link className='link-opacity-100-hover link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover' to={`/users/${user.id}`}>{user.title}</Link>
                    <div className='mt-2 row justify-content-end g-2'>
                      <button className='btn btn-primary col-8'>
                        <Link className='link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover' to={`/users/edit/${user.id}`}>Editar</Link>
                      </button>
                    </div>
                  </p>
                </figcaption>
              </figure>
            </div>
          ))
        ) : (
          <p>Não há Livros cadastrados!</p>
        )}
      </div>
    </section>
  )
}

export default Users