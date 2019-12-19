import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import classnames from 'classnames';
import * as userService from '../../services/api/userService';
import * as validations from '../../lib/utils/validations';


class Register extends Component {
  constructor() {
    super(); 
    this.validator = validations.form_rules;
    this.state = { 
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
      },
      validation: this.validator.valid(),
    };
    this.submitted = false;
  }
    
    handleSubmit = (event) => {
      event.preventDefault();
      this.setState(
        state => {
          const validation = this.validator.validate(state.user);
          if (validation.isValid) {
            userService.register(state.user)
              .then(response => {
                alert("Usuario registrado correctamente!"); // ToDo
              });
            this.props.history.push('/login');
          }
          return { 
            validation 
          };
        }
      );
      this.submitted = true;
    }

    handleOnChange = (e) => {
      const {name, value} = e.target;
      this.setState(state => ({
        user: {
          ...state.user,
          [name]: value
        }
      }));
    }

    render() {
      const validation = this.submitted ?                      
        this.validator.validate(this.state.user) :
        this.state.validation;      
      return (
        <div>
          <section className="container-fluid h-100 py-4 px-4 px-md-5 py-md-5">
            <div className="row justify-content-sm-center mt-4 mb-5">
              <div className="col-sm-8 col-md-8 bg-light rounded p-3 p-md-5 text-center">
                <h2 className="mb-4 text-black">Sign Up</h2>
                <div className="row px-md-5">
                  <div className="col-md-10 mx-auto">
                    <form className="mb-4 mt-4" onSubmit={this.handleSubmit}>
                      <div className="form-group row">
                        <label htmlFor="first_name" className="col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-10">
                          <input onChange={this.handleOnChange} type="text" name="first_name" className={classnames("form-control", {'is-invalid': validation.first_name.isInvalid })} placeholder="First Name" />
                          <span className="text-muted">{validation.first_name.message}</span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="last_name" className="col-sm-2 col-form-label">Last Name</label>
                        <div className="col-sm-10">
                          <input onChange={this.handleOnChange} type="text" name="last_name" className={classnames("form-control", {'is-invalid': validation.last_name.isInvalid })} placeholder="Last Name" />
                          <span className="text-muted">{validation.last_name.message}</span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="phone_number" className="col-sm-2 col-form-label">Celphone</label>
                        <div className="col-sm-10">
                          <input onChange={this.handleOnChange} type="text" name="phone_number" className={classnames("form-control", {'is-invalid': validation.phone_number.isInvalid })} placeholder="xxx-xxxxxx" />
                          <span className="text-muted">{validation.phone_number.message}</span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                          <input onChange={this.handleOnChange} type="text" name="email" className={classnames("form-control", {'is-invalid': validation.email.isInvalid })} placeholder="Email" />
                          <span className="text-muted">{validation.email.message}</span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                          <input onChange={this.handleOnChange} maxLength="20" type="password" name="password" className={classnames("form-control", {'is-invalid': validation.password.isInvalid })} placeholder="Password" />
                          <span className="text-muted">{validation.password.message}</span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="password_confirmation" className="col-sm-2 col-form-label">Password Confirmation</label>
                        <div className="col-sm-10">
                          <input onChange={this.handleOnChange} type="password" name="password_confirmation" className={classnames("form-control", {'is-invalid': validation.password_confirmation.isInvalid })} placeholder="Password Confirmation" />
                          <span className="text-muted">{validation.password_confirmation.message}</span>
                        </div>
                      </div>
                      <div className="row mt-5">
                        <div className="col-lg-6 text-right">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => this.props.history.push('/login')}
                          >
                                                        Go to Login
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
      );
    }
}

export default withRouter(Register);