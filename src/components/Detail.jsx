import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

  return (console.log('character ', character),
    <div>
        <h1>{character.name && character.name}</h1>
        {character.image ? <img src={character.image} alt={character.name}></img> : 'Cargando...'}
        <h2>Status: {character.status ? character.status : 'Cargando...'} </h2>
        <h2>Gender: {character.gender ? character.gender : 'Cargando...'} </h2>
        <h2>Species: {character.species ? character.species : 'Cargando...'} </h2>
        <h2>Origin: {character.origin?.name ? character.origin.name : 'Cargando...'} </h2>
    </div>
  )
}
