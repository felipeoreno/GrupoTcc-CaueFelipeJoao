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
      <div >
        <h1 className='fw-semibold'>Bem vindo à <b className='fw-bolder'>Comunidade de Livros Online</b></h1>
        {authenticated ? (
          <p>Veja o que há de novo no mundo dos Livros</p>
        ) : (
          <p>Crie sua conta e junte-se à comunidade!</p>
        )}
      </div>
      <div className='d-flex justify-content-around flex-wrap'>
        {books.length > 0 ? (
          books.map((book) => (
            <figure className='card' style={{ width: '18rem' }} key={book.id}>
              <img
                src={`${book.thumbnail}`}
                className='card-img-top'
              style={{ width: '10rem' }}
              />
              <figcaption className='card-body'>
                <h3 className='card-title'>{book.name}</h3>
                <p className='card-text'>
                  <span>Peso:</span> {book.weight}kg
                </p>
                {!book.available ? (
                  <Link className="btn btn-warning" to={`/book/${book.id}`}>Mais detalhes</Link>
                ) : (
                  <p className='card-text'>Adotado!</p>
                )}
              </figcaption>
            </figure>
          ))
        ) : (
          <p>Não há books cadastrados ou disponíveis para adoção no momento!</p>
        )}
      </div>
    </section>
  )
}

export default Home