import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import form_rules from '../../constants/rulesRegisterForm';
import classnames from 'classnames';


class Register extends Component {
    constructor() {
        super();
        this.validator = form_rules
        this.state = { 
            user: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                password_confirmation:'',
                phone_number: '',
            },
            validation : this.validatorvalid(),
        }
        this.submitted = false;
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        const validation = this.validator.validate(this.state.user);
        this.setState({ validation });
        this.submitted = true;

        if (validation.isValid) {
            console.log("calling to register user");
            // handle actual form submission here
          }

    }

    handleOnChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            }
        })
    }

    render() {
        let validation = this.submitted ?                      
                            this.validator.validate(this.state.user) :
                            this.state.validation      
        return(
            <div>
                <section className="container-fluid h-100 py-4 px-4 px-md-5 py-md-5">
                    <div className="row justify-content-sm-center mt-4 mb-5">
                        <div className="col-sm-8 col-md-8 bg-light rounded p-3 p-md-5 text-center">
                            <h2 className="mb-4 text-black">Sign Up</h2>
                            <div className="row px-md-5">
                                <div className="col-md-10 mx-auto">
                                    <form className="mb-4 mt-4" onSubmit={this.handleSubmit}>
                                        <div className= "form-group row">
                                            <label htmlFor="first_name" className="col-sm-2 col-form-label">First Name</label>
                                            <div className="col-sm-10">
                                                <input onChange = {this.handleOnChange} type="text" name="first_name" className={`form-control ${validation.first_name.isInvalid ? 'is-invalid' : ''}`} placeholder="First Name" ></input>
                                                <span className="text-muted">{validation.first_name.message}</span>
                                            </div>
                                        </div>
                                        <div className='form-group row'>
                                            <label htmlFor="last_name" className="col-sm-2 col-form-label">Last Name</label>
                                            <div className="col-sm-10">
                                                <input onChange = {this.handleOnChange} type="text" name="last_name" className={classnames("form-control", {'is-invalid': validation.last_name.isInvalid })} placeholder="Last Name" ></input>
                                                <span className="text-muted">{validation.last_name.message}</span>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="phone_number" className="col-sm-2 col-form-label">Celphone</label>
                                            <div className="col-sm-10">
                                                <input onChange = {this.handleOnChange} type="text" name="phone_number" className={classnames("form-control", {'is-invalid': validation.phone_number.isInvalid })} placeholder="xxx-xxxxxx"></input>
                                                <span className="text-muted">{validation.phone_number.message}</span>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                            <div className="col-sm-10">
                                                <input onChange = {this.handleOnChange} type="text" name="email" className={classnames("form-control", {'is-invalid': validation.email.isInvalid })} placeholder="Email" ></input>
                                                <span className="text-muted">{validation.email.message}</span>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                                            <div className="col-sm-10">
                                                <input onChange = {this.handleOnChange}  type="password" name="password"  className={classnames("form-control", {'is-invalid': validation.password.isInvalid })} placeholder="Password"></input>
                                                <span className="text-muted">{validation.password.message}</span>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="password_confirmation" className="col-sm-2 col-form-label">Password Confirmation</label>
                                            <div className="col-sm-10">
                                                <input onChange = {this.handleOnChange}  type="password"  name="password_confirmation" className={classnames("form-control", {'is-invalid': validation.password_confirmation.isInvalid })} placeholder="Password Confirmation"></input>
                                                <span className="text-muted">{validation.password_confirmation.message}</span>
                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            <div className="col-lg-6 text-right">
                                                <button type="button"
                                                    className="btn btn-secondary"
                                                    onClick = {() => this.props.history.push('/')}
                                                >
                                                        Back
                                                </button>
                                            </div>
                                            <div className="col-lg-6 text-left">
                                                <button type="submit" className="btn btn-primary">Sing Up</button>
                                            </div>                            
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
   
}

export default withRouter(Register);