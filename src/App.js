import React, {Component} from 'react';
import {Route , Switch} from "react-router-dom";
import LoginContainer from './containers/LoginContainer';
import './App.css';
import  Register  from './components/auth/Register';
import  ForgotPassword  from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Header from './components/header/header';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
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
                    <Route exact path="/ressetPassword">
                        <ResetPassword/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;
