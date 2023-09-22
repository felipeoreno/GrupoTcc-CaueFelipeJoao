//index.js do HOME
import React, { useContext } from 'react';
import { Context } from '../../context/UserContext';
import api from '../../utils/api';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Home() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState({});
  const { authenticated } = useContext(Context);

  useEffect(() => {
    api.get('/books').then((response) => {
      setBooks(response.data.books)
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


  return (
    <section>
      <div>
        <h1 className='fw-semibold'>Bem vindo à <b className='fw-bolder'>Comunidade de Livros Online</b></h1>
        {authenticated ? (
          <p>Veja o que há de novo no mundo dos Livros</p>
        ) : (
          <p>Crie sua conta e junte-se à comunidade!</p>
        )}
      </div>
      <div className='container d-flex justify-content-around flex-wrap row g-2'>
        {books.length > 0 && user.level !== 0 ? (
          books.map((book) => (
            <div className='col-2' style={{ height: '20rem' }}>
              <figure className='card p-2' key={book.id} style={{ height: '10' }}>
                <Link to={`/books/${book.id}`}>
                  <img
                    src={`${book.thumbnail}`}
                    className='card-img-top'
                  // style={{ width: '18rem' }}
                  />
                </Link>
                <figcaption className='card-body'>
                  <h3 className='card-title'>{book.name}</h3>
                  <p className='card-text'>
                    <Link className='link-opacity-100-hover link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover' to={`/books/${book.id}`}>{book.title}</Link>
                  </p>
                </figcaption>
              </figure>
            </div>
          ))
        ) : books.length > 0 && user.level === 1 ? (
          books.map((book) => (
            <div className='col-2'>
              <figure className='card p-2' key={book.id} style={{ height: '95%' }}>
                <Link to={`/books/${book.id}`}>
                  <img
                    src={`${book.thumbnail}`}
                    className='card-img-top'
                  // style={{ width: '18rem' }}
                  />
                </Link>
                <figcaption className='card-body'>
                  <h3 className='card-title'>{book.name}</h3>
                  <p className='card-text'>
                    <Link className='link-opacity-100-hover link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover' to={`/books/${book.id}`}>{book.title}</Link>
                    <div className='mt-2 row justify-content-end g-2'>
                      <button className='btn btn-primary col-8'>
                        <Link className='link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover' to={`/books/edit/${book.id}`}>Editar</Link>
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

export default Home