//Login/index.js
import React from 'react';
import InputGroup from '../../../components/InputGroup';
import { Link } from 'react-router-dom';

//hooks
import { useContext, useState } from 'react';
//context
import { Context } from '../../../context/UserContext';


function Login() {
  //aqui entra a lógica para o login
  const [user, setUser] = useState({});
  const { login } = useContext(Context);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    login(user);
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <InputGroup
          label='E-mail'
          type='email'
          name='email'
          placeholder='Digite seu email'
          handleChange={handleChange}
        />
        <InputGroup
          label='Senha'
          type='password'
          name='password'
          placeholder='Digite sua senha'
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-primary'>Login</button>
      </form>
      <br />
      <p>
        Não tem conta? <Link to='/register'>Clique aqui!</Link>
      </p>
    </div>
  )
}

export default Login;
