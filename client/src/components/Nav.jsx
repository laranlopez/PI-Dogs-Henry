import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, listOfTemperaments, filterByTemp, filterByCreated,
    orderByName, orderByWeight} from '../actions/index';
import Loading from './Loading';
import '../styles/Home.css';
import '../styles/Nav.css'

export default function Nav({paginate}){
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments); 
    const [currentPage,setCurrentPage] = useState(1);

    console.log(temperaments)
    useEffect (() => {
        dispatch(listOfTemperaments());
        dispatch(getDogs());
    }, [dispatch]);
//------------------------------------------------------------------------------------------
    function handleFilterByCreated(e){
        e.preventDefault();
        dispatch(filterByCreated(e.target.value));
        setCurrentPage(1);
        paginate(1);
    }
//------------------------------------------------------------------------------------------
    function handleFilterByTemp(e){
        e.preventDefault();
        dispatch(filterByTemp(e.target.value));
        setCurrentPage(1);
        paginate(1);    
    }
//------------------------------------------------------------------------------------------
    function handleOrderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        paginate(1);
    }
//------------------------------------------------------------------------------------------
    function handleOrderByWeight(e){
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1);
     }


    return(
        <div className='fltros'>
            <select className='peso' onChange={(e) => handleOrderByWeight(e)}> {/* filtro por peso */}
                <option defaultValue value='All'> Peso</option>
                <option value='asc_p'>De menor a mayor</option>
                <option value='desc_p'>De mayor a menor</option>
            </select>
            <select className='alfab' onChange={(e) => handleOrderByName(e)}> {/* filtro por raza */}
                <option defaultValue value='All'>Raza</option>
                <option value='asc_alf'>A-Z</option>
                <option value='desc_alf'>Z-A</option>
            </select>
            <select className='temper' onChange={(e) => handleFilterByTemp(e)}>{/* filtro por temperamento */}
                <option value='All'>Temperamentos</option>
                {temperaments.length > 0 ? (
                    temperaments.map(e => {
                        return (
                            <option value={e.temperament}
                            key={e.temperament}
                            >{e.temperament}</option>
                        )
                    })
                ) : (
                        <div>
                           <Loading/>
                        </div>
                )};
            </select>
            <select className='todos' onChange={(e) => handleFilterByCreated(e)}>{/* filtro por origen (API, DB) */}
                <option defaultValue value='all_dogs'>Todas las razas</option>
                <option value='dog_api'>API</option>
                <option value='dog_db'>CREADOS</option>
            </select>
        </div>
    )
}