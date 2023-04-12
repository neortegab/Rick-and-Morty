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

   const onSearch = async (id) => {
      try {
         const response = await axios.get(`http://localhost:3001/rickandmorty/character/${id}`);
         const character = {...response.data, id: parseInt(id)};
         const isAlreadyIn = characters.find(character => character.id === id);
         if(isAlreadyIn){
            return window.alert('Este personaje ya fue agregado');
         }
         setCharacters((oldChars) => [...oldChars, character]);
         
      } catch (error) {
         window.alert(error);
      }
   }

   const onRandom = () =>{
      let id = Math.floor(Math.random() * 826);
      if(id===0){
         id++;
      }
      axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
      if (data.name) {
         const isAlreadyIn = characters.find(character => character.id === id);
         if(isAlreadyIn){
            window.alert('Este personaje ya fue agregado');
         } else{
            const character = {...data, id: parseInt(data.id)};
            setCharacters((oldChars) => [...oldChars, character]);
         }
      } else {
         window.alert('¡No hay personajes con este ID!');
      }
   });
   }

   const onClose = (id) => {
      setCharacters(characters => characters.filter(character => character.id !== id));
   }

   const login = async (userData) => {
     const { email, password } = userData;
     const URL = "http://localhost:3001/rickandmorty/login";
     try {
       const { data } = await axios(
         URL + `?username=${email}&password=${password}`
       );
       const { access } = data;
       setAccess(data);
       access && navigate("/home");
     } catch (error) {
       return window.alert(error);
     }
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
