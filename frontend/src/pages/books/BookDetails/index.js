import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../utils/api';

function BookDetails() {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
console.log("ID: ", id)

    api.get(`/books/${id}`).then((response) => {
      setBook(response.data.book)
    })
  }, [id])

  async function addBook() {
    const data = await api
      .post(`books/addbook/${book.id}`, {
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
    alert(data.message);
  }

  return (
    <div>
      <section className='row justify-content-between'>
        <div className='col-5'>
          <h3>{book.title}</h3>
          {book.subtitle && book.subtitle.length > 0 ? (
            <p>{book.subtitle}</p>
          ) : (null)}
          <ul className='list-group list-group-flush'>
            <li key='authors' className='list-group-item'>Autor: {book.authors}</li>
            <li key='categories' className='list-group-item'>Categorias: {book.categories}</li>
            <li key='description' className='list-group-item'>Descrição: {book.description}</li>
            <li key='published_year' className='list-group-item'>Ano de publicação: {book.published_year}</li>
            <li key='ratings_count' className='list-group-item'>Avaliação: {book.average_rating} ({book.ratings_count})</li>
          </ul>
        </div>
        <div className='col-5'>
          <img
            key={null}
            src={book.thumbnail}
            alt={book.title}
            style={{ height: '100%' }}
          />
        </div>
        {token ? (
          <div>
            <button className='btn btn-primary mt-2 col-3' onClick={addBook}>Adicionar à biblioteca</button>
          </div>
        ) : (
          <div>
            <p>
              Você precisa <Link to='/register'>Criar uma conta</Link> para adicionar o Livro à sua biblioteca
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default BookDetails
