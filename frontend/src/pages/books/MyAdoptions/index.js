import React, { useState, useEffect } from 'react'

import api from '../../../utils/api'
import { Link } from 'react-router-dom'

function MyAdoptions() {
    const [pets, setPets] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get(`/pets/myadoptions`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPets(response.data.pets)
        })
    }, [token])

    console.log(pets)

    return (
        <div>
            <div><h3>Minhas adoções</h3></div>
            <div>
                {pets.length > 0 &&
                    pets.map((pet) => (
                        <div key={pet.id}> 
                            <img
                                src={`http://localhost:5000/image/pets/${pet.ImagePets[0].image}`}
                                alt={pet.name}
                            />
                            <span>{pet.name}</span>
                            <div>
                                {pet.User ? (
                                    <>
                                        <p>Ligue para: {pet.User.phone}</p>
                                        <p>Fale com: {pet.User.name}</p>
                                    </>
                                ) : (
                                    <p>Informações do usuário não disponíveis</p>
                                )}
                            </div>

                            <div>
                                {pet.available ? (
                                    <p>Adoção em processo</p>
                                ) : (
                                    <p>Parabéns por concluir a adoção</p>
                                )}
                            </div>
                        </div>
                    ))}

                {pets.length === 0 && <p>Ainda não há pets adotados!!</p>}
            </div>
        </div>
    )
}

export default MyAdoptions