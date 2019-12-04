import React, { useState } from 'react';
import { withRouter, Link} from "react-router-dom";
import Loader from '../Loader';


const Login = ({loading, doLogin, history}) =>  {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleCheckLogin = () => {
         doLogin(email, password)
        .then(response => {
            console.log(response)
            if (response) {
                history.push('/home')
            } else {
                setError('The user or password was incorrect!, please try again.')
            }
        })
        .catch()
    }
   
    return(
        loading ? <Loader/> :
            <section className="container-fluid h-100 px-4 px-md-5 py-md-5">
                <div className="row justify-content-sm-center mt-4 mb-5">
                    <div className="col-sm-8 col-md-5 col-lg-4 bg-light rounded p-3 p-md-5 text-center">
                        <div className="col-lg-12 mb-5">
                            <h2>Login</h2>
                        </div>
                        <div className="col-lg-12 mb-4">
                            <div className="form-group">
                                <input 
                                    className="form-control"
                                    name="email" 
                                    onChange = {
                                        (e) => {
                                            setError('');
                                            setEmail(e.target.value);
                                        } 
                                    }
                                    placeholder="Email" 
                                    type="text"
                                    value={email}
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    className="form-control"  
                                    name="password"
                                    onChange = {
                                        (e) => {
                                            setError('');
                                            setPassword(e.target.value)
                                        } 
                                    } 
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                />
                            </div>
                            <div className="mb-4">
                                <span className="text-danger">{error}</span>
                            </div>
                            <div>
                                <button onClick={handleCheckLogin} name="Login" className="btn btn-primary">Login</button>
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

export default withRouter(Login);