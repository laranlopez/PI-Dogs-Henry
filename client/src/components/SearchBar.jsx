import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameDogs } from '../actions/index';
import '../styles/Home.css';
import '../styles/SearchBar.css'

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        if(name.length === 0){
            return alert('Ingrese una raza')
        } else {
            dispatch(getNameDogs(name));
            setName('');
        }
    };

    return (
        <div className='barra'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input className='bus'
                    type = 'text'
                    placeholder= 'Busca por raza...'
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                <button className='botn' type='submit'
                onClick={(e) => handleSubmit(e)}>BUSCAR</button>
            </form>
        </div>
    );


}