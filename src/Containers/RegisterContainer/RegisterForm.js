import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import classnames from 'classnames';
import memoizeOne from 'memoize-one';
import Loader from '../../Components/Common/loader';
import { validateFieldPassword, form_rules } from '../../Lib/Utils/validations';
import PasswordValidationBox from '../../Components/PasswordValidation/passwordValidationBox';
import PasswordInput from '../../Components/Common/passwordInput';


class Register extends Component {
  constructor(props) {
    super(props);
    this.validator = form_rules;
    this.state = {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
      },
      show: false,
      validation: this.validator.valid(),
    };
    this.submitted = false;
    this.validateFieldPassword = memoizeOne(
      validateFieldPassword,
    );
  }

  handleSubmit = (event) => {
    const {history, doRegister} = this.props;
    event.preventDefault();
    this.setState(
      state => {
        const validation = this.validator.validate(state.user);
        return {
          validation
        };
      },
      () => {
        const validPass = this.validateFieldPassword(this.state.user.password);
        if (validPass && this.state.validation.isValid) {
          doRegister(this.state.user).then(
            response => {
              if (response) {
                history.push('/home');
              }
              this.setState({show: false});
            },
            error => {
              this.setState((state) => ({
                user: {
                  ...state.user,
                  password: '',
                  password_confirmation: ''
                },
                show: false
              }));
            }
          );
        }
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
      const {user, show} = this.state;
      const {loading, history} = this.props;
      const validation = this.submitted ?
        this.validator.validate(user) :
        this.state.validation;
      return (
        loading ? <Loader/> : (
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
                            <input
                              className={classnames("form-control", {'is-invalid': validation.first_name.isInvalid })}
                              name="first_name"
                              onChange={this.handleOnChange}
                              placeholder="First Name"
                              type="text"
                              value={user && user.first_name}
                            />
                            <span className="text-muted">{validation.first_name.message}</span>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="last_name" className="col-sm-2 col-form-label">Last Name</label>
                          <div className="col-sm-10">
                            <input
                              className={classnames("form-control", {'is-invalid': validation.last_name.isInvalid })}
                              onChange={this.handleOnChange}
                              placeholder="Last Name"
                              type="text" name="last_name"
                              value={user && user.last_name}
                            />
                            <span className="text-muted">{validation.last_name.message}</span>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="phone_number" className="col-sm-2 col-form-label">Celphone</label>
                          <div className="col-sm-10">
                            <input
                              className={classnames("form-control", {'is-invalid': validation.phone_number.isInvalid })}
                              name="phone_number"
                              onChange={this.handleOnChange}
                              placeholder="xxx-xxxxxx"
                              type="text"
                              value={user && user.phone_number}
                            />
                            <span className="text-muted">{validation.phone_number.message}</span>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                          <div className="col-sm-10">
                            <input
                              className={classnames("form-control", {'is-invalid': validation.email.isInvalid })}
                              name="email"
                              onChange={this.handleOnChange}
                              placeholder="Email"
                              type="text"
                              value={user && user.email}
                            />
                            <span className="text-muted">{validation.email.message}</span>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                          <div className="col-sm-10">
                            <PasswordInput
                              value={user.password}
                              className={classnames("form-control", {'is-invalid': validation.password.isInvalid })}
                              maxLength="20"
                              name="password"
                              onChange={this.handleOnChange}
                              onFocus={() => this.setState({show: true})}
                              placeholder="Password"
                            />
                            <span className="text-muted">{validation.password.message}</span>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="password_confirmation" className="col-sm-2 col-form-label">Password Confirmation</label>
                          <div className="col-sm-10">
                            <PasswordInput
                              value={user.password_confirmation}
                              className={classnames("form-control", {'is-invalid': validation.password_confirmation.isInvalid })}
                              name="password_confirmation"
                              onChange={this.handleOnChange}
                              placeholder="Password Confirmation"
                            />
                            <span className="text-muted">{validation.password_confirmation.message}</span>
                          </div>
                        </div>
                        {
                          show ? (
                            <PasswordValidationBox
                              password={user && user.password}
                              rePassword={user && user.password_confirmation}
                            />
                          ) : null
                        }
                        <div className="row mt-5">
                          <div className="col-lg-6 text-right">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => history.push('/login')}
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
        )
      );
    }
}

export default withRouter(Register);
