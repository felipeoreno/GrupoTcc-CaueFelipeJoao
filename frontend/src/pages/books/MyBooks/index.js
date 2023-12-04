import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../utils/api'

function MyBooks() {
  const [books, setBooks] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api.get('/books/mybooks', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setBooks(response.data.books)
    })
  }, [token])

  async function removeBook(id) {
    const data = await api.delete(`/books/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      const updatedBooks = books.filter((book) => book.id !== id)
      setBooks(updatedBooks)
      return response.data
    }).catch((err) => {
      return err.response.data
    })

    alert(data.message)
  }
  books.map((book) => (
    console.log(book)
  ))
  return (
    <section className='container'>
      <div>
        <h3>Minha Biblioteca</h3>
      </div>
      <div className='d-flex justify-content-around flex-wrap'>
        {books.length > 0 &&
          books.map((book) => (
            <div className='col-2' style={{ height: '35rem' }}>
              <figure
                key={book[0].id}
                className='card p-2'
                style={{ height: '34rem', width: '18rem' }}
              >
                <img
                  src={`${book[0].thumbnail}`}
                  alt={book[0].title}
                  className='card-img-top'
                />
                <figcaption className='card-body'>
                  <h5 className='card-title'>{book[0].title}</h5>
                  <div>
                    <Link className='btn btn-warning me-2' >Editar</Link>
                    <button
                      onClick={() => { removeBook(book[0].id) }}
                      className='btn btn-danger ms-2'
                    >Excluir</button>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        {books.length === 0 && <p>Ainda não há Livros na sua biblioteca</p>}
      </div>
    </section>
  )
}

export default MyBooks;