import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, listOfTemperaments } from '../actions/index';    
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import Card from './Card';
import Pagination from './Pagination';
import Loading from './Loading';
import SearchBar from './SearchBar';
import Nav from './Nav';


export default function Home() {
    const dispatch = useDispatch();             
    const allDogs = useSelector ((state) => state.dogs);     
    

    //PAGINADO//

    const [currentPage, setCurrentPage] = useState(1);              //pagina actual
    const [dogsPerPage] = useState(8);                              //8 perros por página
    const indexOfLastDog = currentPage * dogsPerPage;               //índice último perro
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;           //índice primer perro
    const currentDog = allDogs.slice(indexOfFirstDog, indexOfLastDog);  //Perros de la página actual  Pág.1 ---> 0-7

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    useEffect (() => {                                      
        dispatch(listOfTemperaments());
        dispatch(getDogs());
    }, [dispatch]);
//------------------------------------------------------------------------------------------
    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
    }


    return(
<div className='home'>
          <div className='create_dog'>
                <Link to='/dog'>
                    <button className="b1">CREA TU RAZA</button>
                </Link>
            </div>
            <div className='load'>
                <button onClick={e => handleClick(e)}
                className='ref'>RECARGAR</button>
            </div>
            <div className='busq'>
                <SearchBar />
            </div>
            <div className='filtros'>
                <Nav />
            </div>
            <div className='paginado'>
                <Pagination
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}
                    paginate={paginate}
                />
                </div>
            <div className='cards'>
                {currentDog.length > 0 ? (
                    currentDog.map(e => {
                        return (
                            <Card 
                                key={e.id}
                                id={e.id}
                                name={e.name} 
                                image={e.image} 
                                temperament={`Temperaments: ${e.temperament}`}
                                weightMin={`Weight Min: ${e.weightMin} kg.`}
                                weightMax={`Weight Max: ${e.weightMax} kg.`}
                            />
                            );
                        })
                ) : (
                        <div>
                            <Loading/>
                        </div>     
                    )}
            </div>
        </div>
    );
}