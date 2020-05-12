import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';
import Config from "./Config";
import Client from "./API/Client";
import Downloader from "./API/Downloader";
import toastr from "toastr";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './redux/rootReducer'

window.Config = new Config();
window.Config.load();
window.APIClient = new Client(window.Config);
window.Downloader = new Downloader(window.APIClient);
window.toastr = toastr;

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister();
