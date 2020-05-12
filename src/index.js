import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';
import Config from "./Config";
import Client from "./API/Client";
import Downloader from "./API/Downloader";
import toastr from "toastr";

window.Config = new Config();
window.Config.load();
window.APIClient = new Client(window.Config);
window.Downloader = new Downloader(window.APIClient);
window.toastr = toastr;

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
)

serviceWorker.unregister();
