import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Cards from './components/Cards.jsx';
import Nav from './components/Nav.jsx'

function App() {
   const [characters, setCharacters] = useState([]);

   const onSearch = (id) => {
      axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
      if (data.name) {
         const isAlreadyIn = characters.find(character => character.id === data.id);
         if(isAlreadyIn){
            window.alert('Este personaje ya fue agregado');
         } else{
            setCharacters((oldChars) => [...oldChars, data]);
         }
      } else {
         window.alert('¡No hay personajes con este ID!');
      }
   });
   }

   const onRandom = () =>{
      let id = Math.floor(Math.random() * 826);
      if(id===0){
         id++;
      }
      axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
      if (data.name) {
         const isAlreadyIn = characters.find(character => character.id === data.id);
         if(isAlreadyIn){
            window.alert('Este personaje ya fue agregado');
         } else{
            setCharacters((oldChars) => [...oldChars, data]);
         }
      } else {
         window.alert('¡No hay personajes con este ID!');
      }
   });
   }

   const onClose = (id) => {
      setCharacters(characters => characters.filter(character => character.id !== parseInt(id)));
   }

   return (
      <div className='App'>
         <Nav onSearch={onSearch} onRandom={onRandom}></Nav>
         <Cards characters={characters} onClose={onClose}/>
      </div>
   );
}

export default App;
