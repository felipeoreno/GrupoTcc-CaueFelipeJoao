import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../../utils/api';

function BookDetails() {
  const [book, setBook] = useState({});
  const [user, setUser] = useState({});
  const { id } = useParams();
  const [token] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      api.get(`/books/${id}`).then((response) => {
        if (response.data.book) {
          console.log("AASADSAADA: ", response.data.book)
          setBook(response.data.book)
        }
      })
    } catch (error) {
      console.log(error)
    }

    if (token) {
      api.get('/users/checkuser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }).then((response) => {
        setUser(response.data)
      })
    }
  }, [id])
  console.log("NIVRL:", user.level)
  async function removeBook() {
    const data = await api.delete(`books/${book.id}`, {
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
    navigate('/');
  }

  async function addBook() {
    const data = await api.post(`books/addbook/${book.id}`, {
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
            style={{ height: '22rem' }}
          />
        </div>
        <div className='col-2'></div>
        <div className='col-6 d-flex justify-content-start mt-2'>
          {token && user.level === 1 ? (
            <>
              <div className='m-1'>
                <button className='btn btn-primary' onClick={addBook}>Adicionar à biblioteca</button>
              </div>
              <div className='m-1'>
                <button className='btn btn-danger' onClick={removeBook}>Remover livro</button>
              </div>
              <div className='m-1'>
                <button className='btn btn-warning'><Link className='link-light link-underline link-underline-opacity-0' to={`/books/edit/${book.id}`}>Editar livro</Link></button>
              </div>
            </>
          ) : token && user.level === 0 ? (
            <div className='m-1'>
              <button className='btn btn-primary' onClick={addBook}>Adicionar à biblioteca</button>
            </div>
          ) : (
            <div>
              <p>
                Você precisa <Link to='/register'>Criar uma conta</Link> para adicionar o Livro à sua biblioteca
              </p>
            </div>
          )}
          <div className='m-1'>
            <button className='btn btn-primary'><Link className='link-light link-underline link-underline-opacity-0' to={`https://www.amazon.com.br/s?k=${book.title} ${book.authors}`}>Comprar</Link></button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BookDetails
