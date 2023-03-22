import React, { useState } from 'react';

export default function SearchBar(props) {
   const [id, setId] = useState('');

   const handleChange = (e) => {
      const valueInput = e.target.value;
      setId(valueInput);
   }

   const onSearch = props.onSearch;

   const onRandom = props.onRandom;

   return (
      <div>
         <input type='search' onChange={e => handleChange(e)} value={id}/>
         <button onClick={() => onSearch(id)}>Agregar</button>
         <button onClick={() => onRandom()}>Random</button>
      </div>
   );
}
