import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import HomePage from './components/pages/homePage/homePage'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
              <Route path="/" exact component={HomePage} />
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
