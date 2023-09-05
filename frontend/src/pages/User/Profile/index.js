import React from 'react';
import api from '../../../utils/api';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Profile() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    api.get('/mybooks').then((response) => {
      setUser(response.data.books)
    })
  }, []);

  return (
    <div>Profile</div>
  );
}

export default Profile;
