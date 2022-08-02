import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/LandingPage.css';

export default function LandingPage(){
 return (
     <div className='fondo'>
        <div className='titulo'>
         <h1>Bienvenidos a Huellitas 🐾</h1>
         <Link to = '/home'>
             <button className='btn'>INGRESAR</button>
         </Link>
         </div>
     </div>
 )

}