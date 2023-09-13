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

  async function concludeAdoption(id) {
    const data = await api.patch(`/books/conclude/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      return response.data
    }).catch((err) => {
      return err.response.data
    })
    alert(data.message)
  }

  return (
    <section className='container'>
      <div>
        <h3>Minha Biblioteca</h3>
        {/* <Link to='/book/add'>Cadastrar Book</Link> */}
      </div>
      <div className='d-flex justify-content-around flex-wrap'>
        {books.length > 0 &&
          books.map((book) => (
            <figure
              key={book.id}
              className='card'
              style={{ width: '18rem' }}
            >
              <img
                src={`${book.thumbnail}`}
                alt={book.name}
                className='card-img-top'
                style={{ height: '300px' }}
              />
              <figcaption className='card-body'>
                <h5 className='card-title'>{book.name}</h5>
                <div>
                  {book.available ? (
                    <>
                      {book.adopter && (
                        <button
                          onClick={() => { concludeAdoption(book.id) }}
                          className='btn btn-info'
                        >Concluir adoção</button>
                      )}
                      <Link className='btn btn-warning' >Editar</Link>
                      <button
                        onClick={() => { removeBook(book.id) }}
                        className='btn btn-danger'
                      >Excluir</button>
                    </>
                  ) : (
                    <p>Book já adotado</p>
                  )}
                </div>
              </figcaption>
            </figure>
          ))}
        {books.length === 0 && <p>Ainda não há books cadastrados</p>}
      </div>
    </section>
  )
}

export default MyBooks;