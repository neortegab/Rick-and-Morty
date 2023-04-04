import React from 'react'
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div>
        <h1>Ups! 404</h1>
        <h2>A veces hay que ir más despacio</h2>
        <Link to='/home'>
            <p>Demos un pequeño paso atrás.</p>
        </Link>
    </div>
  )
}
