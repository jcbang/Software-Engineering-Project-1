import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import Home from './Home';
import Tiles from './Components/Tiles';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<Home />, document.getElementById('root'));

serviceWorker.unregister();
