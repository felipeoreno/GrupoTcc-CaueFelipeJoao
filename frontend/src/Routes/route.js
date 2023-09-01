import React, { useContext } from 'react';
import { Context } from '../context/UserContext';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import api from '../utils/api';
import Home from '../pages/Home';

//componentes

// Usuário 
import Login from '../pages/User/Login';
import Profile from '../pages/User/Profile';
import Register from '../pages/User/Register';

// Livros
import AddBook from '../pages/Books/AddBook';
import BookDetails from '../pages/Books/BookDetails';
import EditBook from '../pages/Books/EditBook';
import MyBooks from '../pages/Books/MyBooks';


function MyRoutes() {
  const { authenticated } = useContext(Context);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.get('/users/checkuser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }).then((response) => {
        setUser(response.data)
      })
    }
  }, []);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {authenticated ? (
          <>
            <Route exact path="/user/profile" element={<Profile />} />
            <Route exact path="/books/:id" element={<BookDetails />} />
            <Route exact path="/books/mybooks" element={<MyBooks />} />
          </>
        ) : (
          <>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
          </>
        )}
        {user.level === 1 ? (
          <>
            <Route exact path="/books/create" element={<AddBook />} />
            <Route exact path="/books/edit" element={<EditBook />} />
          </>
        ) : ('')}
      </Routes>
    </>
  )
}

export default MyRoutes;
