import React, { useState , useEffect } from 'react';
import { withRouter, Link} from "react-router-dom";
import classnames from 'classnames';
import Loader from '../Loader';
import FormValidator from '../FormValidator'
import { setToken } from './auth'
import PropTypes from 'prop-types';


const rules = [
    { 
        field: 'email', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Email is required.' 
    },
    { 
        field: 'email',
        method: 'isEmail', 
        validWhen: true, 
        message: 'That is not a valid email.'
    },
    { 
        field: 'password', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Password is required.'
    },
    { 
        field: 'password', 
        method: 'matches',
        args: [/^.*(?=.{6,}).*$/], 
        validWhen: true, 
        message: 'Password must have at least six characters.'
    },
]
const useValidatedField = (rules, initialState) => {
    const validator = new FormValidator(rules);
    const [credentials, setCredentials] = useState(initialState);
    const [validation, setValidation] = useState(validator.validate(credentials));
    return [
      validation,
      credentials,
      (newFields) => {
        setValidation(validator.validate(newFields));
        setCredentials(newFields);
      },
    ];
  };

const Login = ({ loading, doLogin, history }) =>  {
    const [error, setError] = useState('');
    const [validation, credentials, setCredentials] = useValidatedField(rules, {email:'', password: ''});
    const [submmited, setSubmitted] = useState(false);

    useEffect(() => {
        error && setError('');
    }, [credentials]); 

    const handleCheckLogin = async () => {
        setSubmitted(true);
        
        if (validation.isValid) {
            const response = await doLogin(credentials.email, credentials.password)
            if (response) {
                setToken(response.data.jwtToken);
                history.push('/home')
            } else {
                setError('The user or password was incorrect!, please try again.')
            }
        }
    }
   
    return(
        loading ? <Loader/> :
            <section className="container-fluid h-100 px-4 px-md-5 py-md-5">
                <div className="row justify-content-sm-center mt-4 mb-5">
                    <div className="col-sm-8 col-md-5 col-lg-4 bg-light rounded p-3 p-md-5 text-center">
                        <div className="col-lg-12 mb-5">
                            <h2>Login</h2>
                        </div>
                        <div className="col-lg-10 mb-4 mx-auto">
                            <div className="form-group">
                                <input 
                                    className= {classnames("form-control", {'is-invalid': submmited &&  validation.email.isInvalid})}
                                    name="email" 
                                    onChange = {
                                        (e) => {
                                            setCredentials({...credentials, email: e.target.value});
                                        } 
                                    }
                                    placeholder="Email" 
                                    type="text"
                                    value={credentials.email}
                                />
                                <span className="text-muted">{submmited && validation.email.message}</span>
                            </div>
                            <div className="form-group">
                                <input 
                                    className= {classnames("form-control", {'is-invalid':  submmited && validation.password.isInvalid})}
                                    name="password"
                                    onChange = {
                                        (e) => {
                                            setCredentials({...credentials, password: e.target.value})
                                        } 
                                    } 
                                    placeholder="Password"
                                    type="password"
                                    value={credentials.password}
                                />
                                 <span className="text-muted">{submmited && validation.password.message}</span>
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
                        <Link
                            className="text-decoration text-dark"
                            to="/ressetPassword">
                             <u>Reset Password (temporal)</u>
                        </Link>
                    </div>
                </div>
            </section>
        )
    }

Login.propTypes = {
    loading: PropTypes.bool.isRequired,
    doLogin: PropTypes.func.isRequired,
    history: PropTypes.func.isRequired,
}
export default withRouter(Login);