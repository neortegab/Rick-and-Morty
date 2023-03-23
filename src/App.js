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

function App() {
   const [characters, setCharacters] = useState([]);

   const [access, setAccess] = useState(false);

   const EMAIL = 'ne.beltran18@gmail.com';
   const PASSWORD = '123456';

   const {pathname} = useLocation();

   const navigate = useNavigate();

   
   useEffect(() => {
      !access && navigate('/');
      // eslint-disable-next-line
   }, [access]);

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

   const login = (userData) => {
      if (userData.password === PASSWORD && userData.email === EMAIL) {
         setAccess(true);
         navigate('/home');
      }
   }

   const logOut = () => {
      setAccess(false);
   }

   return (
      <div className='App'>
         {(pathname!=='/') && <Nav onSearch={onSearch} onRandom={onRandom} logOut={logOut}></Nav>}
         <Routes>
            <Route path='/' element={<Form login={login}/>}></Route>
            <Route path='/home' element={<Cards characters={characters} onClose={onClose}/>}></Route>
            <Route path='/about' element={<About></About>}></Route>
            <Route path='/detail/:id' element={<Detail></Detail>}></Route>
            <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
         </Routes>
      </div>
   );
}

export default App;
