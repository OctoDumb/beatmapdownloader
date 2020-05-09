import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends Component {
  componentDidMount() {
    this.setState({
      url: window.electron.ipcRenderer.sendSync("pls")
    });
  }

  render() {
    return (
      <div className="App">
        <header className = "App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>URL: {this.state?.url || "none"}</p>
        </header>
      </div>
    )
  }
}
