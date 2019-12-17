import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import Loader from '../Loader';
import * as userService from '../../services/api/user.service';
import * as validations from '../../lib/utils/validations';
import FormValidator from '../FormValidator';
import { setToken } from './auth';

const passwordMatch = (confirmation, state) => (state.newPassword === confirmation);

const form_rules = new FormValidator([
    
  { 
    field: 'newPassword', 
    method: 'isEmpty', 
    validWhen: false, 
    message: 'Password is required.'
  },
  { 
    field: 'newPassword', 
    method: 'matches',
    args: validations.contain8Character(), 
    validWhen: true, 
    message: 'Password must have at least 8 characters.'
  },
  { 
    field: 'newPassword', 
    method: 'matches',
    args: validations.contain1UpperCase(), 
    validWhen: true, 
    message: 'Password must have at least one uppercase.'
  },
  { 
    field: 'newPassword', 
    method: 'matches',
    args: validations.contain1LowerCase(), 
    validWhen: true, 
    message: 'Password must have at least one lowercase.'
  },
  { 
    field: 'newPassword', 
    method: 'matches',
    args: validations.contain1NumberOrSpecialChar(), 
    validWhen: true, 
    message: 'Password must have at least one number or special char.'
  },
  { 
    field: 'reNewPassword', 
    method: 'isEmpty', 
    validWhen: false, 
    message: 'Password confirmation is required.'
  },
  { 
    field: 'reNewPassword', 
    method: passwordMatch, 
    validWhen: true, 
    message: 'Password and password confirmation do not match.'
  }
]);


class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.validator = form_rules;
    this.state = {
      user: {
        newPassword: '',
        reNewPassword: '',
      },
      error: null,
      validation: this.validator.valid()
    };
    this.submitted = false;
    this.loading = false;
  }

    handleChange = (event) => {
      const {name, value} = event.target;
      const {user} = this.state;
      this.setState({
        user: {
          ...user,
          [name]: value
        }
      });
    }
    
    getTokenParamFromUrl = () => {
      const query = new URLSearchParams(this.props.location.search);
      return query.get('token');
    }

    handleSubmit = () => {
      this.loading = true;
      const token = this.getTokenParamFromUrl();
      this.setState(
        state => {
          const validation = this.validator.validate(state.user);
          if (validation.isValid) {
            userService.forgotPasswordConfirm(state.user, token)
              .then(
                (response) => {
                  alert("The password was changed successfully!");
                  setToken(response.data.jwtToken);
                  this.props.history.push('/home');
                }
              ).catch(
                (error) => this.setState({
                // error: (error instanceof ClientError) ? error.message : 'Internal Error'
                })
              );
          }
          return { 
            validation 
          };
        }
      );
      this.submitted = true;
    }
    
    render() {
      const validation = this.submitted ?                      
        this.validator.validate(this.state.user) :
        this.state.validation;
      return (
        this.state.loading ? <Loader/> : (
          <>
            {
              this.state.error && (
                <div className="form-group alert-danger">{this.state.error}</div>
              )
            }

            <div className="form-group">
              <input
                type="password"
                name="newPassword"
                value={this.state.user.newPassword}
                maxLength="20"
                onChange={this.handleChange}
                className={
                  classnames(
                    'form-control py-2',
                    {
                      'is-invalid': validation.newPassword.isInvalid 
                    }
                  )
                }
                placeholder="Password"
              />
              <span className="text-muted">{validation.newPassword.message}</span>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="reNewPassword"
                value={this.state.user.reNewPassword}
                maxLength="20"
                onChange={this.handleChange}
                className={
                  classnames(
                    'form-control py-2',
                    {
                      'is-invalid': validation.reNewPassword.isInvalid 
                    }
                  )
                }
                placeholder="Confirm Password"/>
              <span className="text-muted">{validation.reNewPassword.message}</span>
            </div>
            <div className="mt-5">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleSubmit}
              >
                                  Send
              </button>
            </div>
          </>
        )
      );
    }
}

export default withRouter(ResetPassword);
