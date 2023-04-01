import React, { useState } from 'react';
import './styles/SearchBar.css'

export default function SearchBar(props) {
   const [id, setId] = useState('');

   const handleChange = (e) => {
      const valueInput = e.target.value;
      setId(valueInput);
   }

   const onSearch = props.onSearch;

   const onRandom = props.onRandom;

   return (
      <div className='searchbar-container'>
         <input className='searchbar-input' type='search' onChange={e => handleChange(e)} value={id}/>
         <button className='searchbar-button' onClick={() => onSearch(id)}>Add</button>
         <button className='searchbar-button' onClick={() => onRandom()}>Random</button>
      </div>
   );
}
