import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import CreateDog from './components/CreateDog';
import Details from './components/Details';


function App() {
  return (
    <Router>
      <div className='App'>
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/dog' element={<CreateDog/>}/>
        <Route path='/dogs/:id' element={<Details/>}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;

