import React, { useState } from 'react'
import InputGroup from '../../../components/InputGroup'
import api from '../../../utils/api'

function AddPet() {
    const [book, setBook] = useState({})
    const [preview, setPreview] = useState()
    const [token] = useState(localStorage.getItem('token') || '')

    function handleChange(e) {
        setBook({ ...book, [e.target.name]: e.target.value })
    }
    const [thumbnail, setThumbnail] = useState(null)
    function onFileChange(e) {
        setPreview(URL.createObjectURL(e.target.files[0]))
        setThumbnail(e.target.files[0])
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData()

        if (thumbnail) {
            formData.append('thumbnail', thumbnail)
        }

        //montando objeto com o formulario
        await Object.keys(book).forEach((key) => formData.append(key, book[key]))

        const data = await api.post(`books/create`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            alert(err.response.data)
            return err.response.data
        })
        alert(data.message)
    }

    return (
        <div>
            <h3>Cadastre um Pet para adoção</h3>
            <form onSubmit={handleSubmit}>
                <InputGroup
                    type='file'
                    label='Colocar foto do dog'
                    name='thumbnail'
                    handleChange={onFileChange}
                />
                <InputGroup
                    type='number'
                    label='Digite o nome do dog'
                    name='isbn'
                    placeholder='Digite o nome do cachorro'
                    handleChange={handleChange}
                />
                <InputGroup
                    type='text'
                    label='Digite a idade do dog'
                    name='title'
                    placeholder='Digite a idade do cachorro'
                    handleChange={handleChange}
                />
                <InputGroup
                    type='text'
                    label='Digite o peso'
                    name='authors'
                    placeholder='Digite o peso do cachorro'
                    handleChange={handleChange}
                />
                <InputGroup
                    type='text'
                    label='Digite a cor'
                    name='categories'
                    placeholder='Digite a cor'
                    handleChange={handleChange}
                />
                <button type='submit'>Cadastrar</button>
            </form>
        </div>
    )
}

export default AddPet