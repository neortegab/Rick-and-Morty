import React from 'react';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

export default function Nav({onSearch, onRandom, logOut}) {

  const handleLogOut = () =>{
    logOut();
  }
  return (  
    <div>
      <Link to='/about'>
          <button>About</button>
        </Link>
        <Link to='/home'>
          <button>Home</button>
        </Link>
        <button onClick={() => handleLogOut()}>Log out</button>
        <SearchBar onSearch={onSearch} onRandom={onRandom}></SearchBar>
    </div>
  )
}
