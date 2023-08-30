import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../../utils/api'

function BookDetails() {

    const [book, setBook] = useState({})
    const { id } = useParams()

    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get(`/books/${id}`).then((response) => {
            setBook(response.data.book)
        })
    }, [id])

    async function schedule() {
        const data = await api
            .patch(`books/schedule/${book.id}`, {
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
        alert(data.message)
    }

    return (
        <div>
            {book.name && (
                <section>
                    <div>
                        <h3>Conhecendo o Book: {book.name}</h3>
                        <p>Se tiver interesse, marque uma visita para conhece-lo</p>
                    </div>
                    <div>
                        {book.ImageBooks && book.ImageBooks.length > 0 ? (
                            book.ImageBooks.map((imageBook, index) => {
                                const imageUrl = `http://localhost:5000/image/books/${imageBook.image}`
                                return (
                                    <img
                                        key={index}
                                        src={imageUrl}
                                        alt={book.name}
                                    />
                                )
                            })
                        ) : (
                            <p>Não há imagens disponiveis para esse cachorro</p>
                        )}
                    </div>
                    <p>Peso: {book.weight}kg</p>
                    <p>Idade: {book.age} anos</p>
                    {token ? (
                        <button onClick={schedule}>Solicitar uma Visita</button>
                    ) : (
                        <p>
                            Você precisa <Link to='/register'>Criar uma conta</Link> para solicitar a visita
                        </p>
                    )}
                </section>
            )}
        </div>
    )
}

export default BookDetails