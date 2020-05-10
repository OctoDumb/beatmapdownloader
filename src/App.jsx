import React, { Component } from 'react';
import WindowControl from './components/WindowControl/WindowControl';
import 'normalize.css';
import './App.scss';
import Content from './components/Content/Content';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDownload, faTimes, faWindowMinimize, faWindowMaximize } from '@fortawesome/free-solid-svg-icons';

library.add(faDownload, faTimes, faWindowMaximize, faWindowMinimize);

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <WindowControl />
        <Content />
      </div>
    )
  }
}
