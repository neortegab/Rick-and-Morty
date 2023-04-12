import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Cards from './components/Cards.jsx';
import Nav from './components/Nav.jsx'
import About from './components/About.jsx';
import Detail from './components/Detail.jsx';
import PageNotFound from './components/PageNotFound';
import Form from './components/Form.jsx';
import Favorites from './components/Favorites.jsx'

function App() {
   const [characters, setCharacters] = useState([]);

   const [access, setAccess] = useState(false);

   const {pathname} = useLocation();

   const navigate = useNavigate();

   
   useEffect(() => {
      !access && navigate('/');
      // eslint-disable-next-line
   }, [access]);

   const onSearch = (id) => {
      axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
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
      setCharacters(characters => characters.filter(character => character.id !== id));
   }

   const login = (userData) => {
     const { email, password } = userData;
     const URL = "http://localhost:3001/rickandmorty/login";
     axios(URL + `?username=${email}&password=${password}`).then(({ data }) => {
       const { access } = data;
       setAccess(data);
       access && navigate("/home");
     });
   };

   const logOut = () => {
      setAccess(false);
   }

   return (
      <div>
         {(pathname!=='/') && <Nav onSearch={onSearch} onRandom={onRandom} logOut={logOut}></Nav>}
         <Routes>
            <Route path='/' element={<Form login={login}/>}></Route>
            <Route path='/home' element={<Cards characters={characters} onClose={onClose}/>}></Route>
            <Route path='/about' element={<About></About>}></Route>
            <Route path='/detail/:id' element={<Detail></Detail>}></Route>
            <Route path='/favorites' element={<Favorites onClose={onClose}/>}></Route>
            <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
         </Routes>
      </div>
   );
}

export default App;
