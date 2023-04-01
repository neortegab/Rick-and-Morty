import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/Detail.css'

export default function Detail() {
    const {id} = useParams();
    const [character, setCharacter] = useState({});

    useEffect(() => {
        axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
           if (data.name) {
              setCharacter(data);
           } else {
              window.alert('No hay personajes con ese ID');
           }
        });
        return setCharacter({});
     }, [id]);

  return (
    <div className='detail-container'>
        <h1 className='detail-character-name'>{character.name && character.name}</h1>
        {character.image ? <img className='detail-character-img' src={character.image} alt={character.name}></img> : 'Cargando...'}
        <h2 className='detail-character-details'>Status: {character.status ? character.status : 'Cargando...'} </h2>
        <h2 className='detail-character-details'>Gender: {character.gender ? character.gender : 'Cargando...'} </h2>
        <h2 className='detail-character-details'>Species: {character.species ? character.species : 'Cargando...'} </h2>
        <h2 className='detail-character-details'>Origin: {character.origin?.name ? character.origin.name : 'Cargando...'} </h2>
    </div>
  )
}
