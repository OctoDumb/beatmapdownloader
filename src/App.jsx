import React, { Component } from 'react';
import WindowControl from './components/WindowControl/WindowControl';
import 'normalize.css';
import './App.scss';
import Content from './components/Content/Content';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faWindowMinimize, faWindowMaximize } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes, faWindowMaximize, faWindowMinimize)

export default class App extends Component {
  /* componentDidMount() {
    this.setState({
      url: window.electron.ipcRenderer.sendSync("pls")
    });
  } */

  render() {
    return (
      <div className="App">
        <WindowControl />
        <Content />
        {/* <header className = "App-header">
          <p>URL: {this.state?.url || "none"}</p>
        </header> */}
      </div>
    )
  }
}
