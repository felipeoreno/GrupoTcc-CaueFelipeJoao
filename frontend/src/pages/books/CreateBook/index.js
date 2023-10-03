import React, { useState } from 'react';
import api from '../../../utils/api';
import InputGroup from '../../../components/InputGroup';
import SelectMultiple from '../../../components/SelectMultiple';
import Select from 'react-select';

function AddBook() {
  const [book, setBook] = useState({ categories: [] })
  const [preview, setPreview] = useState()
  const [token] = useState(localStorage.getItem('token') || '')

  function handleChange(e) {
    if (e.target) {
      setBook({ ...book, [e.target.name]: e.target.value });
    } else {
      // Handle the categories (multiple selection)
      const selectedCategories = e.map(option => option.value);
      setBook({ ...book, categories: selectedCategories });
    }
  }

  // const [selectedOptions, setSelectedOptions] = useState(new Set());

  // function selectHandleChange(e) {
  //   // console.log("selectedOptions: ", selectedOptions)
  //   // console.log("target name: ", e.target.name)
  //   // console.log("target value: ", e.target.value)
  //   // const selectedOption = e.target.value;
  //   // console.log("selectedOption: ", selectedOption)

  //   // if (selectedOptions.has(selectedOption)) {
  //   //   setSelectedOptions(selectedOptions.filter((option) => option !== selectedOption));
  //   //   console.log("selectedOptions1: ", selectedOptions)
  //   // } else {
  //   //   setSelectedOptions(...selectedOptions, {[e.target.name]: selectedOption});
  //   //   console.log("selectedOptions2: ", selectedOptions)
  //   // }

  //   console.log("selectedOptions: ", selectedOptions)
  //   console.log("target name: ", e.target.name)
  //   console.log("target value: ", e.target.value)
  //   const selectedOption = e.target.value;
  //   // console.log("selectedOption: ", selectedOption):

  //   if (selectedOptions.has(selectedOption)) {
  //     selectedOptions.delete(selectedOption);
  //     console.log("selectedOptions1: ", selectedOptions)
  //   } else {
  //     selectedOptions.add(selectedOption);
  //     console.log("selectedOptions2: ", selectedOptions)
  //   }

  //   setSelectedOptions(new Set(selectedOptions));
  // };

  const [thumbnail, setThumbnail] = useState(null)

  const options = [
    {
      value: 'Fantasia',
      label: 'Fantasia',
    },
    {
      value: 'Ficção científica',
      label: 'Ficção científica',
    },
    {
      value: 'Ação e aventura',
      label: 'Ação e aventura',
    },
    {
      value: 'Horror',
      label: 'Horror',
    },
    {
      value: 'Distopia',
      label: 'Distopia',
    },
    {
      value: 'Romance',
      label: 'Romance',
    },
    {
      value: 'Conto',
      label: 'Conto',
    },
    {
      value: 'Infantil',
      label: 'Infantil',
    },
    {
      value: 'Infanto-juvenil',
      label: 'Infanto-juvenil',
    },
    {
      value: 'Clássicos',
      label: 'Clássicos',
    },
    {
      value: 'Humor e comédia',
      label: 'Humor e comédia',
    },
    {
      value: 'Arte',
      label: 'Arte',
    },
    {
      value: 'História',
      label: 'História',
    },
    {
      value: 'Música',
      label: 'Música',
    },
    {
      value: 'Filosofia',
      label: 'Filosofia',
    },
    {
      value: 'Ciência Política e Atualidades',
      label: 'Ciência Política e Atualidades',
    },
    {
      value: 'LGBTQIA+',
      label: 'LGBTQIA+',
    },
    {
      value: 'Cultural e étnico',
      label: 'Cultural e étnico',
    },
    {
      value: 'Religião e Espiritualidade',
      label: 'Religião e Espiritualidade',
    },
    {
      value: 'Biografias e memórias',
      label: 'Biografias e memórias',
    },
    {
      value: 'Viagem',
      label: 'Viagem',
    }
  ];
  // // const options = [
  // //   {
  // //     value: '1',
  // //     label: 'Opcao 1',
  // //   },
  // //   {
  // //     value: '2',
  // //     label: 'Opcao 2',
  // //   },
  // //   {
  // //     value: '3',
  // //     label: 'Opcao 3',
  // //   },
  // //   {
  // //     value: '4',
  // //     label: 'Opcao 3',
  // //   },
  // //   {
  // //     value: '5',
  // //     label: 'Opcao 3',
  // //   },
  // //   {
  // //     value: '6',
  // //     label: 'Opcao 3',
  // //   },
  // //   {
  // //     value: '7',
  // //     label: 'Opcao 3',
  // //   }
  // // ];
  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ]
  // console.log("options: ", options)

  function onFileChange(e) {
    setPreview(URL.createObjectURL(e.target.files[0]))
    setThumbnail(e.target.files[0])
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData()
    console.log("thumbnail: ", thumbnail)
  // parei aqui 03/10
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
        <SelectMultiple
          placeholder='Escolha as categorias do livro'
          handleChange={handleChange}
          options={options}
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