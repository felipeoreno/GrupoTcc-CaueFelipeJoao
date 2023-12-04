import React, { useContext } from 'react';
import { Context } from '../context/UserContext';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import api from '../utils/api';
import Home from '../pages/Home';

//componentes

// Usuário 
import Login from '../pages/User/Login';
import EditProfile from '../pages/User/EditProfile';
import Profile from '../pages/User/Profile';
import Register from '../pages/User/Register';
import Users from '../pages/User/Users';
import UserDetails from '../pages/User/UserDetails';

// Livros
import AddBook from '../pages/Books/CreateBook';
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
        {user.level === 1 ? (
          <>
            <Route exact path="/books/create" element={<AddBook />} />
            <Route exact path="/books/edit/:id" element={<EditBook />} />
          </>
        ) : (null)}
        {authenticated ? (
          <>
            <Route exact path="/user/profile" element={<Profile />} />
            <Route exact path="/user/profile/edit" element={<EditProfile />} />
            <Route exact path="/books/mybooks" element={<MyBooks />} />
            <Route exact path="/books/:id" element={<BookDetails />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/users/:id" element={<UserDetails />} />
          </>
        ) : (
          <>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default MyRoutes;
