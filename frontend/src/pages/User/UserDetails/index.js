import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../utils/api';

function UserDetails() {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    console.log("ID: ", id)
    try {
      api.get(`/users/${id}`).then((response) => {
        if (response.data.user) {
          console.log("AASADSAADA: ", response.data.user)
          setUser(response.data.user)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }, [id])

  console.log("BOOK: ", user)

  async function followUser() {
    const data = await api.post(`users/follow/${user.id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        return err.response.data
      })
    alert(data.message);
  }

  return (
    <div>
      <section className='row justify-content-between'>
        <div className='col-5'>
          <h3>{user.name}</h3>
          <ul className='list-group list-group-flush'>
            <li key='authors' className='list-group-item'>Seguidores: {user.followers}</li>
            <li key='categories' className='list-group-item'>Seguindo: {user.following}</li>
          </ul>
          <div>
            <button className='btn btn-primary mt-3' onClick={followUser}>Seguir {user.name}</button>
          </div>
        </div>
        <div className='col-3'></div>
        <div className=' d-flex w-25 border rounded justify-content-around'>
          <img
            key={null}
            src={`http://localhost:5000/image/users/${user.image}`}
            alt={user.name}
            style={{ height: '100%' }}
          />
        </div>
      </section>
    </div>
  )
}

export default UserDetails
