import React from 'react';
import './styles/About.css'
import image from '../image/foto.png'

export default function About() {
  return (
    <div className='about-container'>
      <h1 className='detail-character-name'>Nelson Enrique Ortega Beltrán</h1>
        <img className='detail-character-img' src={image} alt='Nelson'></img>
        <h2 className='detail-character-details'>Nacionalidad: Colombia</h2>
        <h2 className='detail-character-details'>Edad: 22 años</h2>
    </div>
  )
}
