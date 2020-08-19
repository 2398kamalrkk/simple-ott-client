import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import HomePage from './components/pages/homePage/homePage';
import { useParams } from "react-router";
import VideoDetails from './components/pages/videoDetails/videoDetails';
import VideoPlayer from './components/segments/videoPlayer/videoPlayer';
import 'bootstrap/dist/css/bootstrap.min.css';

function Details() {
  let { id } = useParams();
  return <VideoDetails videoId={id}/>;
}

function Player() {
  let { id } = useParams();
  return <VideoPlayer videoId={id}/>;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/video/:id" children={<Details />} />
              <Route path="/play/:id" children={<Player />} />
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
