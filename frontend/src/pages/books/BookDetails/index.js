import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../utils/api';

function BookDetails() {

  const [book, setBook] = useState({});
  const { id } = useParams();

  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
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
      <section>
        <div>
          <h3>{book.title}</h3>
          {book.subtitle && book.subtitle.length > 0 ? (
            <p>{book.subtitle}</p>
          ) : (null)}
        </div>
        <div>
          <img
            key={null}
            src={book.thumbnail}
            alt={book.title}
          />
        </div>
        {token ? (
          <button onClick={addBook}>Solicitar uma Visita</button>
        ) : (
          <p>
            Você precisa <Link to='/register'>Criar uma conta</Link> para adicionar o Livro à sua biblioteca
          </p>
        )}
      </section>
    </div>
  )
}

export default BookDetails
