//componente register 
import React from 'react'
import InputGroup from '../../../components/InputGroup'

//hooks
import { useContext, useState } from 'react'

//context
import { Context } from '../../../context/UserContext'

function Register() {
  //a logica para enviar um formulario, ou para fazer qualquer coisa diferenciada em uma pagina fica nesse local
  const [user, setUser] = useState({})
  const { register } = useContext(Context)

  function handleChange(evento) {
    setUser({ ...user, [evento.target.name]: evento.target.value })
    //{...user}: isso aqui, cria uma cópia do objeto user atual, usando a sintaze de espalhamento do javascript(...), essa cópia e feita para preservar valores existentes no objeto antes de fazer qualquer att
  }

  function handleSubmit(evento) {
    evento.preventDefault()
    register(user)
  }

  return (
    <div>
      <h2>Registrar</h2>
      <div>
        <form onSubmit={handleSubmit} className='row'>
          <div className='col-6'>
            <InputGroup
              type='text'
              label='Digite seu nome'
              placeholder='Seu nome aqui'
              name='name'
              handleChange={handleChange}
            />
          </div>
          <div className='col-6'>
            <InputGroup
              type='tel'
              label='Digite seu telefone aqui'
              placeholder='Seu telefone aqui'
              name='phone'
              handleChange={handleChange}
            />
          </div>
          <div className='col-9'>
            <InputGroup
              type='email'
              label='Digite seu email'
              placeholder='Seu email aqui'
              name='email'
              handleChange={handleChange}
            />
          </div>
          <div className='col-3'></div>
          <div className='col-6'>
            <InputGroup
              type='password'
              label='Digite sua senha'
              placeholder='Digite sua senha'
              name='password'
              handleChange={handleChange}
            />
          </div>
          <div className='col-6'>
            <InputGroup
              type='password'
              label='Confirme sua senha'
              placeholder='Confirme sua senha'
              name='confirmpassword'
              handleChange={handleChange}
            />
          </div>
          <div className='col-2'>
            <button type='submit' className='btn btn-primary'>Registrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register