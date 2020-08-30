import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import HomePage from './components/pages/homePage/homePage';
import { useParams } from "react-router";
import VideoDetails from './components/pages/videoDetails/videoDetails';
import VideoPlayer from './components/segments/videoPlayer/videoPlayer';
import LoginPage from './components/pages/loginPage/loginPage';
import Register from './components/pages/registerUser/registerUser';

import ChannelDetails from './components/pages/channelDetails/channelDetails';

import { Slide,ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function Details() {
  let { id } = useParams();
  return <VideoDetails videoId={id}/>;
}

function Player() {
  let { id } = useParams();
  return <VideoPlayer videoId={id}/>;
}
function Channel() {
  let { id } = useParams();
  return <ChannelDetails channelId={id}/>;
}

function App() {
  
  return (
    <div className="App" >
      <BrowserRouter>
        {
          localStorage.getItem('token') == null ||  localStorage.getItem('token') == "false" ? 
          <Switch>
              <Route path="/" exact component={LoginPage} />
              <Route path="/register" children={<Register />} />
          </Switch>
        :
        <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/channel/:id" children={<Channel />} />
              <Route path="/video/:id" children={<Details />} />
              <Route path="/play/:id" children={<Player />} />
        </Switch>}
      </BrowserRouter>
      <ToastContainer
        transition={Slide}
        position="top-center"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
