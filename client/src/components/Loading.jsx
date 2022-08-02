import React from 'react';
import '../styles/Loading.css';
import LoadingDog from '../images/LoadingDog.gif';

export default function Loading(){
    return (
        <div className='loader'>
            <h2 className='cargando'>Cargando...</h2>
            <img src={LoadingDog} className='gif' alt="Cargando" />
        </div>
        );
};