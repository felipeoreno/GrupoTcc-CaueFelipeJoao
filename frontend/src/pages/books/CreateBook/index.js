import React, { useState } from 'react'
import InputGroup from '../../../components/InputGroup'
import api from '../../../utils/api'

function AddBook() {
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
      <h3>Cadastre um Livro</h3>
      <form onSubmit={handleSubmit}>
        <InputGroup
          type='file'
          label='Colocar capa do livro'
          name='thumbnail'
          handleChange={onFileChange}
        />
        <InputGroup
          type='number'
          label='Digite código ISBN de 13 dígitos do Livro'
          name='isbn'
          placeholder='Digite o código ISBN aqui'
          handleChange={handleChange}
        />
        <InputGroup
          type='text'
          label='Digite o título do Livro'
          name='title'
          placeholder='Digite o título aqui'
          handleChange={handleChange}
        />
        <InputGroup
          type='text'
          label='Digite o subtítulo do Livro'
          name='subtitle'
          placeholder='Digite o subtítulo aqui'
          handleChange={handleChange}
        />
        <InputGroup
          type='text'
          label='Digite o nome do(s) autor(es)'
          name='authors'
          placeholder='Digite aqui o nome'
          handleChange={handleChange}
        />
        <InputGroup
          type='text'
          label='Digite as categorias do Livro'
          name='categories'
          placeholder='Digite aqui as categorias'
          handleChange={handleChange}
        />
        <InputGroup
          type='text'
          label='Digite a descrição do Livro'
          name='description'
          placeholder='Digite aqui a descrição'
          handleChange={handleChange}
        />
        <InputGroup
          type='number'
          min='-10000'
          max='2023'
          label='Digite o ano de publicação do Livro'
          name='published_year'
          placeholder='Digite aqui o ano de publicação'
          handleChange={handleChange}
        />
        <InputGroup
          type='number'
          min='1'
          label='Digite o número de páginas do Livro'
          name='num_pages'
          placeholder='Digite aqui o número de páginas'
          handleChange={handleChange}
        />
        <button type='submit'>Cadastrar</button>
      </form>
    </div>
  )
}

export default AddBook