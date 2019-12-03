import React, { Component } from 'react';
import { withRouter, Link} from "react-router-dom";
import { callBackLogin } from '../services/fake_back_login';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: {
                message:''
            }
        
        }
    }
    handleCheckLogin = () => {
        callBackLogin(this.state)
        .then(response => {
            if (response) {
                this.props.history.push('/home')
            } else {
                this.setState({
                    ...this.state,
                    error:{
                        ...this.state,
                        message: 'The user or password was incorrect!, please try again.'
                    }
                })
            }
        
        })
        .catch()
    }
    
    handleOnChange = (e) => {
        const {name, value} = e.target;
        
        this.setState({
            ...this.state,
            [name]: value,
            error: {
                ...this.state.error,
                message : ''
            }
        })
    }
    
    render() {
        return(
            <section className="container-fluid h-100 px-4 px-md-5 py-md-5">
                <div className="row justify-content-sm-center mt-4 mb-5">
                    <div className="col-sm-8 col-md-5 col-lg-4 bg-light rounded p-3 p-md-5 text-center">
                        <div className="col-lg-12 mb-5">
                            <h2>Login</h2>
                        </div>
                        <div className="col-lg-12 mb-4">
                            <div className="form-group">
                                <input name="email" onChange = {this.handleOnChange} aria-describedby="emailHelp" placeholder="Email" type="text" className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <input type="password" onChange = {this.handleOnChange} name="password" className="form-control"  placeholder="Password"></input>
                            </div>
                            <div className="mb-4">
                                <span className="text-danger">{this.state.error.message}</span>
                            </div>
                            <div>
                                <button onClick = {this.handleCheckLogin} name="Login" className="btn btn-primary">Login</button>
                            </div>
                        </div>
                        <p className="mt-5">Register{' '}
                            <Link
                                className="text-decoration text-dark"
                                to="/register"
                            >
                                <u>Create an account</u>
                            </Link>
                        </p>
                        <p>Forgot password?{' '}
                            <Link
                                className="text-decoration text-dark"
                                to="/forgotPassword">
                                <u>Recover it</u>
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        )
    }
}
export default withRouter(Login);