import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import CreateDog from './components/CreateDog';
import Details from './components/Details';


function App() {
  return (
    <Router>
      <div className='App'>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route path='/dog' component={CreateDog}/>
        <Route path='/dogs/:id' component={Details}/>
      </Switch  >
      </div>
    </Router>
  );
}

export default App;

