import React from 'react';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import './styles/Nav.css'

export default function Nav({onSearch, onRandom, logOut}) {

  const handleLogOut = () =>{
    logOut();
  }
  return (  
    <div className='navbar'>
      <Link to='/about'>
          <button className='navbar-button'>About</button>
        </Link>
        <Link to='/home'>
          <button className='navbar-button'>Home</button>
        </Link>
        <Link to='/favorites'>
          <button className='navbar-button'>Favorites</button>
        </Link>
        <button className='navbar-button' onClick={() => handleLogOut()}>Log out</button>
        <SearchBar onSearch={onSearch} onRandom={onRandom}></SearchBar>
    </div>
  )
}
