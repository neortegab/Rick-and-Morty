import React from 'react'
import SearchBar from './SearchBar'

export default function Nav(props) {
  return (  
    <div>
        <SearchBar onSearch={props.onSearch} onRandom={props.onRandom}></SearchBar>
    </div>
  )
}
