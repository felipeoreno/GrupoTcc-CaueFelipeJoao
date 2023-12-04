import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import InputGroup from '../../../components/InputGroup';
import SelectMultiple from '../../../components/SelectMultiple';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

function EditBook() {
  const [book, setBook] = useState({ categories: [] });
  const { id } = useParams();
  const [preview, setPreview] = useState();
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    setBook({ ...book, isbn: id });
  }, [id])

  function handleChange(e) {
    if (e.target) {
      setBook({ ...book, [e.target.name]: e.target.value });
    } else {
      // Handle the categories (multiple selection)
      const selectedCategories = e.map(option => option.value);
      setBook({ ...book, categories: selectedCategories });
    }
  }

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

  const [thumbnail, setThumbnail] = useState(null)
  function onFileChange(e) {
    console.log("E: ", e)
    setPreview(URL.createObjectURL(e.target.files[0]))
    setThumbnail(e.target.files[0])
    console.log("PREVIEW: ", preview)
    console.log("THUMBNAIL: ", thumbnail)
  }

  //   async function handleSubmit(e) {
  //     e.preventDefault()

  //     const formData = new FormData()

  //     // if (thumbnail) {
  //     //   formData.append('thumbnail', thumbnail)
  //     // }

  // console.log("FORMDATA: ", formData)
  // console.log("FORMDATA-THUMBNAIL: ", formData.get('thumbnail'))

  //     //montando objeto com o formulario
  //     await Object.keys(book).forEach((key) => formData.append(key, book[key]))
  //     for (const pair of formData.entries()) {
  //       console.log(`${pair[0]}, ${pair[1]}`);
  //     }
  // console.log("FORMDATA ID: ", formData.get("isbn"))

  //     const data = await api.post(`books/create`, {
  //       body: formData,
  //       file: thumbnail
  //     }, {
  //       headers: {
  //         Authorization: `Bearer ${JSON.parse(token)}`,
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     }).then((response) => {
  //       console.log("aaaaaa:")
  //       return response.data
  //     }).catch((err) => {
  //       console.log("aaaaaa:", err)
  //       return err.response.data
  //     })
  //     alert(data.message)
  //   }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("bookokok:", book)
    const formData = new FormData();

    // Append book data to formData
    Object.keys(book).forEach((key) => formData.append(key, book[key]));

    // Append thumbnail file to formData
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    try {
      // Make the API call using axios (assuming 'api' is an axios instance)
      const response = await api.patch(`books/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'application/json',
        },
      });

      // Handle the response
      console.log('Response:', response.data);
      alert(response.data.message);
    } catch (error) {
      // Handle errors
      console.error('Error:', error.response.data);
      alert(error.response.data.message || 'Um erro ocorreu.');
    }
  }


  return (
    <div>
      <h3>Edite o livro de código ISBN {id}</h3>
      <form className='row' onSubmit={handleSubmit}>
        <div className='col-6'>
          <InputGroup
            type='text'
            label='Digite o título do Livro'
            name='title'
            placeholder='Digite o título aqui'
            handleChange={handleChange}
          />
        </div>
        <div className='col-6'>
          <InputGroup
            type='text'
            label='Digite o subtítulo do Livro'
            name='subtitle'
            placeholder='Digite o subtítulo aqui'
            handleChange={handleChange}
          />
        </div>
        <div className='col-6'>
          <InputGroup
            type='text'
            label='Digite o nome do(s) autor(es)'
            name='authors'
            placeholder='Digite aqui o nome'
            handleChange={handleChange}
          />
        </div>
        <div className='col-6'>
          <SelectMultiple
            placeholder='Escolha as categorias do livro'
            handleChange={handleChange}
            options={options}
          />
        </div>
        <div className='col-6'>
          <InputGroup
            type='text'
            label='Digite a descrição do Livro'
            name='description'
            placeholder='Digite aqui a descrição'
            handleChange={handleChange}
          />
        </div>
        <div className='col-6'>
          <InputGroup
            type='number'
            min='-10000'
            max='2023'
            label='Digite o ano de publicação do Livro'
            name='published_year'
            placeholder='Digite aqui o ano de publicação'
            handleChange={handleChange}
          />
        </div>
        <div className='col-6'>
          <InputGroup
            type='number'
            min='1'
            label='Digite o número de páginas do Livro'
            name='num_pages'
            placeholder='Digite aqui o número de páginas'
            handleChange={handleChange}
          />
        </div>
        <div className='col-6'>
          <InputGroup
            type='file'
            label='Colocar capa do livro'
            name='thumbnail'
            handleChange={onFileChange}
          />
        </div>
        <div className='col-2'>
          <button type='submit' className='btn btn-primary'>Cadastrar</button>
        </div>
      </form>
    </div>
  )
}

export default EditBook
