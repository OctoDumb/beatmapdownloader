import React, { Component } from 'react';
import WindowControl from './components/WindowControl/WindowControl';
import 'normalize.css';
import './App.scss';
import Content from './components/Content/Content';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDownload, faTimes, faWindowMinimize, faWindowMaximize, faWindowRestore, faFilm, faImage } from '@fortawesome/free-solid-svg-icons';
import { Route } from 'react-router-dom';
import Preloader from './components/Preloader/Preloader';
import Login from './components/Login/Login';
import Authorization from './components/Preloader/Authorization';

library.add(faDownload, faTimes, faWindowMaximize, faWindowMinimize, faWindowRestore, faFilm, faImage);

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/">
          <Preloader />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/auth">
          <Authorization />
        </Route>
        <Route path="/app">
          <WindowControl />
          <Content />
        </Route>
      </div>
    )
  }
}
