import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterCard, orderCard } from '../redux/actions/actions.js';
import Card from './Card.jsx'
import './styles/Favorites.css'

export default function Favorites(props) {

    const { allFavorites, filteredCharacters } = useSelector((state) => state);

    const dispatch = useDispatch();

    const handleOrder = (event) => {
        dispatch(orderCard(event.target.value));
    }

    const handleFilter = (event) => {
        dispatch(filterCard(event.target.value));
    }

    useEffect(() => {
        dispatch(filterCard('All'));
        dispatch(orderCard('A'));
    }, [allFavorites])

return (
    <div className='favorites-container'>
        <div className='favorites-select'>
            <select className='favorites-select-content' onChange={(e)=>handleOrder(e)}>
                <option value='A'>Ascending</option>
                <option value='D'>Descending</option>
            </select>
            <select className='favorites-select-content' onChange={(e)=>handleFilter(e)}>
                <option value='All'>All</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Genderless'>Genderless</option>
                <option value='unknown'>Unknown</option>
            </select>
        </div>
        <div className='favorites-card-container'>
            {filteredCharacters && filteredCharacters.map((character, index) => 
                <Card 
                key={index} 
                id={character.id}
                name={character.name}
                status={character.status}
                species={character.species}
                gender={character.gender}
                origin={character.origin.name}
                image={character.image}
                onClose={props.onClose}
                />
            )}
        </div>  
    </div>
  )
}
