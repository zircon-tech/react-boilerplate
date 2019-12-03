import React, {Component} from 'react';
import Login from './components/Login'
import './App.css';
import {Route , Switch} from "react-router-dom";
import  Register  from './components/Register';
import { ForgotPassword } from './components/ForgotPassword';


class App extends Component{
    
    render() {
        return (
        <div className="App">
            <Switch>
                <Route path="/register">
                    <Register />
                </Route>
                <Route  path="/home">
                   <h2>Welcome to Home Page</h2>
                </Route>
                <Route exact path="/forgotPassword">
                    <ForgotPassword></ForgotPassword>
                </Route>
                <Route exact path="/">
                    <Login></Login>
                </Route>
                
            </Switch>
        </div>
        );
    }
}

export default App;
