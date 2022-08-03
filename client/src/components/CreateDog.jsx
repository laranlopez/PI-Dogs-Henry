import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postDog, listOfTemperaments } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/CreateDog.css';

export default function CreateDog(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const temperaments = useSelector((state) => state.temperaments);

    useEffect(() => {
        dispatch(listOfTemperaments());
    }, [dispatch]);

    const[input, setInput] = useState({
        name: '',
        heightMin: 0,
        heightMax: 0,
        weightMin: 0,
        weightMax: 0,   
        lifespan: '',
        image: '',
        temperament: [],
    })

    const [error, setError] = useState({first:true});

    const validations = function(input){
        const error = {}
        if(!input.name){
            error.name = 'Se requiere un nombre';
        }
        else if(!/^[a-zA-Z\s]*$/.test(input.name)) {
            error.name = "Solo debe contener letras y espacios";
        }
        if(!Number(input.heightMin) || Number(input.heightMin) < 0 ){
            error.heightMin = 'Debe ingresar una altura min, mayor a 0';
        }
       else if(Number(input.heightMin) > Number(input.heightMax)){
            error.heightMin = 'Altura Min no puede ser mayor a la altura maxima';
        }
        if(!Number(input.heightMax) || Number(input.heightMax) < 0){
            error.heightMax = 'Debe ingresar una altura max, mayor a 0';
        }
        if(!Number(input.weightMin) || Number(input.weightMin)< 0 ){
            error.weightMin = 'Debe ingresar un peso minimo, mayor a 0';
        }
        if(Number(input.weightMin) > Number(input.weightMax)){
            error.weightMin = 'Peso Min no puede ser mayor al peso maximo';
         }
         if(!Number(input.weightMax) ||Number(input.weightMax) < 0 ){
            error.weightMax = 'Debe ingresar un peso max, mayor a 0';
         }
        if(Number(input.lifespan) < 0 || Number(input.lifespan )> 30){
            error.lifespan = 'debe ser entre 0 y 30 ';
        }
        return error;
    }
//------------------------------------------------------------------------------------------
    const handleChangeInput = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validations({
            ...input,
            [e.target.name]: e.target.value
        }))
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
                heightMin: 0,
                heightMax: 0,
                weightMin: 0,
                weightMax: 0,
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
                            type='number'
                            value={input.heightMin}
                            placeholder='Solo numeros'
                            name='heightMin'
                            onChange={(e) => handleChangeInput(e)}

                            />
                            <label>Max* </label>
                            <input className='amax'
                            type='number'
                            value={input.heightMax}
                            placeholder='Solo numeros'
                            name='heightMax'
                            onChange={(e) => handleChangeInput(e)}
                            />
                        </span>
                        {!error.heightMin ? null: <p className='err'>{error.heightMin}</p>}
                        {!error.heightMax ? null: <p className='err'>{error.heightMax}</p>}
                    </div>
                    <div className='pemin'>
                        <h2 className='tpemin'>Peso* (kg)</h2>
                        <span>
                            <label>Min* </label>
                            <input className='pmin'
                            type='number'
                            value={input.weightMin}
                            placeholder='Solo numeros'
                            name='weightMin'
                            onChange={(e) => handleChangeInput(e)}
                            autoComplete="off"
                            />
                            <label>Max* </label>
                            <input className='pmax'
                            type='number'
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


// setInput(input => {
//     const newInput = {
//         ...input,
//         [e.target.name] : e.target.value
// }
// const error = validations(newInput);
// setError(error);
// return newInput;
// })
// }