//index.js do HOME
import React, { useContext } from 'react';
import { Context } from '../../context/UserContext';
import api from '../../utils/api';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Home() {
  const [books, setBooks] = useState([]);
  const { authenticated } = useContext(Context);

  useEffect(() => {
    api.get('/books').then((response) => {
      setBooks(response.data.books)
    })
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
        {books.length > 0 ? (
          books.map((book) => (
            <div className='col-2' style={{ height: '20rem' }}>
              <figure className='card h-100 p-2' key={book.id}>
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
        ) : (
          <p>Não há Livros cadastrados!</p>
        )}
      </div>
    </section>
  )
}

export default Home