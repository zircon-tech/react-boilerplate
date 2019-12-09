import React, {Component} from 'react';
import LoginContainer from './containers/LoginContainer'
import './App.css';
import {Route , Switch} from "react-router-dom";
import  Register  from './components/auth/Register';
import  ForgotPassword  from './components/auth/ForgotPassword';


class App extends Component {
    render() {
        return (
        <div className="App">
            <Switch>
                <Route path="/user">
                    <Register />
                </Route>
                <Route  path="/home">
                   <h2>Welcome to Home Page</h2>
                </Route>
                <Route exact path="/forgotPassword">
                    <ForgotPassword></ForgotPassword>
                </Route>
                <Route exact path="/login">
                    <LoginContainer/>
                </Route>
                
            </Switch>
        </div>
        );
    }
}

export default App;
