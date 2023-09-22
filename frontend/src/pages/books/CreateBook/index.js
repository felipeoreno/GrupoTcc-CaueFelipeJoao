import React, { useState } from 'react';
import api from '../../../utils/api';
import InputGroup from '../../../components/InputGroup';
import SelectMultiple from '../../../components/SelectMultiple';

function AddBook() {
  const [book, setBook] = useState({})
  const [preview, setPreview] = useState()
  const [token] = useState(localStorage.getItem('token') || '')

  function handleChange(e) {
    setBook({ ...book, [e.target.name]: e.target.value })
  }

  const [selectedOptions, setSelectedOptions] = useState();

  function selectHandleChange(e) {
    console.log("selectedOptions: ", selectedOptions)
    console.log("target name: ", e.target.name)
    console.log("target value: ", e.target.value)
    const selectedOption = e.target.value;
    console.log("selectedOption: ", selectedOption)

    if (selectedOptions.includes(selectedOption)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== selectedOption));
      console.log("selectedOptions1: ", selectedOptions)
    } else {
      setSelectedOptions(...selectedOptions, {[e.target.name]: selectedOption});
      console.log("selectedOptions2: ", selectedOptions)
    }
  }; //parei aqui 22/09

  const [thumbnail, setThumbnail] = useState(null)
  const options = [
    {
      value: "1",
      label: "Opção 1",
    },
    {
      value: "2",
      label: "Opção 2",
    },
    {
      value: "3",
      label: "Opção 3",
    },
    {
      value: "4",
      label: "Opção 3",
    },
    {
      value: "5",
      label: "Opção 3",
    },
    {
      value: "6",
      label: "Opção 3",
    },
    {
      value: "7",
      label: "Opção 3",
    }
  ];

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
        'Content-Type': 'application/json'
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
        {/* <InputGroup
          type='text'
          label='Digite as categorias do Livro'
          name='categories'
          placeholder='Digite aqui as categorias'
          handleChange={handleChange}
        /> */}
        <SelectMultiple
          options={options}
          name="categories"
          label="Escolha as categorias do Livro"
          handleChange={selectHandleChange}
          selectedOptions={selectedOptions}
        ></SelectMultiple>
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