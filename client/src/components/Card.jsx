import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css';

export default function Card({id, image, name, temperament, weightMin, weightMax}){

    return(
        <div className='Container'>
        <div className='card'>
            <Link to={`/dogs/${id}`} style={{textDecoration: 'none', color: 'white'}}>
            <img className='image' src={image} alt='img not found' width='250px' height='200px'/>
            <h2>{name}</h2>
            <div className='temwei'>
                <p>{temperament}</p>
                <p>{weightMin}</p>
                <p>{weightMax}</p>
            </div>
            </Link>
        </div>
     </div>
    );
};