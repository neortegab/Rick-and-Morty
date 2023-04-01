import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/actions/actions';
import { Link } from 'react-router-dom';
import './styles/Card.css'

export default function Card(props) {

   const { id, name, status, species, gender, origin, image, onClose} = props;

   const { allFavorites } = useSelector((state) => state);
   
   const dispatch = useDispatch();

   const [isFav, setFavorite] = useState(false);

   useEffect(() => {
      allFavorites.forEach((fav) => {
         if (fav.id === id) {
            setFavorite(true);
         }
      });
   }, [allFavorites]);

   const handleFavorite = () => {
      if(isFav){
         setFavorite(false);
         dispatch(removeFavorite(id));
      } else{
         setFavorite(true);
         let favoriteCharacter = {
            id: id,
            name: name,
            status: status, 
            species: species, 
            gender: gender, 
            origin: origin, 
            image: image
         } 
         dispatch(addFavorite(favoriteCharacter));
      }
   }

   const handleClose = (id) => {
      onClose(id);
      dispatch(removeFavorite(id));
   }

   return (
      <div className='card-container'>
         <img className='card-img' src={image} alt={name} />
         <div className='card-text'>
            <Link className='card-link' to={`/detail/${id}`}>
               <h2 className='card-h2'>{name}</h2>
            </Link>
            <h2 className='card-h2'>{status}</h2>
         </div>
         <div className='card-button-container'>
            {isFav ? (<button className='card-button' onClick={handleFavorite}>❤️</button>) : (<button className='card-button' onClick={handleFavorite}>🤍</button>)}
            <button className='card-button' onClick={() => handleClose(id)}>X</button>
         </div>
      </div>
   );
}