import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Recipe from './recipe';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

//Switch renders the exact page that matches the url
//in contrast every <Route> that matches location renders inclusively
ReactDOM.render(
    <App/>,
    document.getElementById('root'));


// ReactDOM.render(<ALink/>,document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
