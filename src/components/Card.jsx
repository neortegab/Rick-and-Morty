import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Card.css'

export default function Card(props) {
   return (
      <div className='card'>
         <button onClick={() => props.onClose(props.characterId)}>X</button>
         <Link to={`/detail/${props.characterId}`}>
            <h2>{props.name}</h2>
         </Link>
         <h2>{props.status}</h2>
         <h2>{props.species}</h2>
         <h2>{props.gender}</h2>
         <h2>{props.origin.name}</h2>
         <img src={props.image} alt={props.name} />
      </div>
   );
}
