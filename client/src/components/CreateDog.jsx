import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postDog, listOfTemperaments } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/CreateDog.css';

export default function CreateDog(){
    const dispatch = useDispatch();
    const navigate = useHistory();
    const temperaments = useSelector((state) => state.temperaments);

    useEffect(() => {
        dispatch(listOfTemperaments());
    }, [dispatch]);

    const[input, setInput] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lifespan: '',
        image: '',
        temperament: [],
    })

    const [error, setError] = useState({});

    const validations = function(input){
        const error = {}
        if(!input.name){
            error.name = 'Se requiere un nombre';
        }
        else if(!/^[a-zA-Z\s]*$/.test(input.name)) {
            error.name = "Solo debe contener letras y espacios";
        }
        if(!input.heightMin){
            error.heightMin = 'Altura Min es requerido';
        }
        if(!input.heightMax){
            error.heightMax = 'Altura Max es requerido';
        }
        if(!input.weightMin){
            error.weightMin = 'Peso Min es requerido';
        }
        if(!input.weightMax){
            error.weightMax = 'Peso Max es requerido';
        }
        if(input.heightMin < 0){
            error.heightMin = 'Altura Min debe ser mayor a 0';
        }
        if(input.heightMin > input.heightMax){
            error.heightMin = 'Altura Min no puede ser mayor al peso maximo';
        }
        
        if(input.heightMax < 0){
            error.heightMax = 'Altura Max debe ser mayor a 0';
        }
        
        if(input.weightMin< 0){
            error.weightMin = 'Peso Min debe ser mayor a cero';
        }
        if(input.weightMin > input.weightMax){
            error.weightMin = 'Peso Min no puede ser mayor al peso maximo';
        }
        if(input.weightMax < 0){
            error.weightMax = 'Weight Max debe ser mayor a 0';
        }
        if(input.lifespan < 0){
            error.lifespan = 'debe ser mayor a 0';
        }
        return error;
    }
//------------------------------------------------------------------------------------------
    const handleChangeInput = (e) => {
        e.preventDefault();
        setInput(input => {
            const newInput = {
                ...input,
                [e.target.name] : e.target.value
        }
        const error = validations(newInput);
        setError(error);
        return newInput;
        })
    }
//------------------------------------------------------------------------------------------
    function handleSelect(e){
        
        setInput({
            ...input,
            temperament: [...new Set([...input.temperament, e.target.value])]
        });
    }
//------------------------------------------------------------------------------------------
    function handleDelete(e){
        setInput({
            temperament: input.temperament.filter(tem => tem !== e)
        });
    }
//------------------------------------------------------------------------------------------
    function handleSubmit(e){
        e.preventDefault();
        if(input.name && input.heightMin && input.heightMax && input.weightMin
            && input.weightMax && input.lifespan && input.temperament){
            dispatch(postDog(input));
            alert('Raza creada!')
            setInput({
                name: '',
                heightMin: '',
                heightMax: '',
                weightMin: '',
                weightMax: '',
                lifespan: '',
                image: '',
                temperament: [],
            });
            navigate('/home');
        } else {
            alert('Por favor, complete todos los campos')
        }
    };
    

    return (
        <div className='create'>
            <form className='form' onSubmit={(e) => handleSubmit(e)}>
                <div style={{width: '50%', float: 'left'}}> 
                    <div className='nombre'>
                        <h2 className='tnom'>Nombre*</h2>
                        <input className='nom'
                        type='text'
                        value={input.name}
                        placeholder='Solo letras y espacios'
                        name='name'
                        onChange={(e) => handleChangeInput(e)}
                        autoComplete="off"
                        />
                        {error.name && <p className='err'>{error.name}</p>}
                    </div>
                    <div  className='altmin'>
                        <h2 className='taltmin'>Altura* (cm)</h2>
                        <span>
                            <label>Min* </label>
                            <input className='amin'
                            type='text'
                            value={input.heightMin}
                            placeholder='Solo numeros'
                            name='heightMin'
                            onChange={(e) => handleChangeInput(e)}
                            autoComplete="off"
                            />
                            <label>Max* </label>
                            <input className='amax'
                            type='text'
                            value={input.heightMax}
                            placeholder='Solo numeros'
                            name='heightMax'
                            onChange={(e) => handleChangeInput(e)}
                            autoComplete="off"
                            />
                        </span>
                        {error.heightMin && <p className='err'>{error.heightMin}</p>}
                        {error.heightMax && <p className='err'>{error.heightMax}</p>}
                    </div>
                    <div className='pemin'>
                        <h2 className='tpemin'>Peso* (kg)</h2>
                        <span>
                            <label>Min* </label>
                            <input className='pmin'
                            type='text'
                            value={input.weightMin}
                            placeholder='Solo numeros'
                            name='weightMin'
                            onChange={(e) => handleChangeInput(e)}
                            autoComplete="off"
                            />
                            <label>Max* </label>
                            <input className='pmax'
                            type='text'
                            value={input.weightMax}
                            placeholder='Solo numeros'
                            name='weightMax'
                            onChange={(e) => handleChangeInput(e)}
                            autoComplete="off"
                            />
                        </span>
                        {error.weightMin && <p className='err'>{error.weightMin}</p>}
                        {error.weightMax && <p className='err'>{error.weightMax}</p>}
                    </div>
                    <div className='lifes'>
                        <h2 className='tlifes'>Esperanza de vida*</h2>
                        <input className='life'
                        type='text'
                        value={input.lifespan}
                        placeholder='0 - 30 años'
                        name='lifespan'
                        onChange={(e) => handleChangeInput(e)}
                        autoComplete="off"
                        />
                        {error.lifespan && <p>{error.lifespan}</p>}
                    </div>
                    <div>
                        <span> 
                        <Link to= '/home'><button className='volver'>Volver</button></Link>          
                        <button className='guardar' type='submit' disabled={Object.keys(error).length > 0 ? true : false}>Guardar</button>
                        </span>
                        <span>
                            <h3>Los campos con * son obligatorios</h3>
                        </span>
                    </div>
                </div>
                <div style={{width: '50%', float: 'right'}}>
                    <div className='image'>
                        <h2 className='timag'>Imagen</h2>
                        <input className='imag'
                        type='text'
                        value={input.image}
                        placeholder='Introduzca url'
                        name='image'
                        onChange={(e) => handleChangeInput(e)}
                        autoComplete="off"
                        />
                    </div>
                    <div className='temperi'>
                        <h2 className='temps'>Temperamentos</h2> <br/>
                        <select className='temp' onChange={(e) => handleSelect(e)}>
                            <option></option>
                                {temperaments?.map((temp) => {
                                    return(
                                        <option 
                                        key={temp.id} 
                                        value={temp.temperament}>
                                        {temp.temperament}</option>
                                    );
                            })}
                        </select>
                        <div className='ts'>
                            {input.temperament.map(tem =>
                                <span key={tem}>
                                    <h3>{tem}</h3>
                                    <button className='btncre' onClick={() => handleDelete(tem)}>X
                                    </button>
                                </span>
                                )}
                        </div>
                    </div>
                </div> 
            </form>
        </div>
    );
}