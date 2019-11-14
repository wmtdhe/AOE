import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Recipe from "./recipe";
import Home from "./home";
import Contact from "./contact";
import Search from "./search";
import SignUp from "./signup";

// const axios = require('axios');
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
class App extends Component{
  render(){
    return(
        <Router>
                <Switch>
                    <Route path='/' component={Home} exact/>
                    <Route path='/recipe' component={Recipe} exact/>
                    <Route path='/contact' component={Contact} />
                    <Route path='/search' component={Search} exact/>
                    <Route path='/user/signup' component={SignUp} exact>

                    </Route>

                </Switch>
        </Router>
    )
  }
}

export default App;
