import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import memoizeOne from 'memoize-one';
import Loader from '../Loader';
import * as userService from '../../services/api/user.service';
import { validateFieldPassword } from '../../lib/utils/validations';
import { setToken } from './auth';
import FormValidator from '../FormValidator';
import PasswordValidationBox from '../PasswordValidation/PasswordValidationBox';
import ClientError from '../../lib/utils/exceptions';


const passwordMatch = (confirmation, state) => (state.newPassword === confirmation);

const form_rules = new FormValidator([
    
  { 
    field: 'newPassword', 
    method: 'isEmpty', 
    validWhen: false, 
    message: 'Password is required.'
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
      validation: this.validator.valid(),
      tokenValidation: false,
      loading: false,
      show: false
    };
    this.submitted = false;
    this.validateFieldPassword = memoizeOne(
      validateFieldPassword,
    );
  }
  
  componentDidMount() {
    this.setState({loading: true});
    const token = this.getTokenParamFromUrl();
    userService.checkValidationToken(token).then(
      () => {
        this.setState({
          tokenValidation: true,
          loading: false
        });
      }
    ).catch((error) => {
      this.setState({
        tokenValidation: false,
        loading: false,
        // error: (error instanceof ClientError) ? error.message : "Internal Error"
      });
    });
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
      this.setState({loading: true});
      const token = this.getTokenParamFromUrl();
      this.setState(
        state => {
          const validation = this.validator.validate(state.user);
          const validPass = this.validateFieldPassword(state.user.newPassword);
          if (validPass && validation.isValid) {
            userService.forgotPasswordConfirm(state.user, token)
              .then(
                (response) => {
                  this.setState({loading: false});
                  alert("The password was changed successfully!");
                  setToken(response.data.jwtToken);
                  this.props.history.push('/home');
                }
              ).catch(
                (error) => this.setState({
                  loading: false,
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
      if (!this.state.tokenValidation) {
        return (
          this.state.loading ? 
            <Loader/> : <h5 className="text-danger">This link has alreay been used.</h5>
        );
      }
      const validation = this.submitted ?                      
        this.validator.validate(this.state.user) :
        this.state.validation;
      return (
        this.stateloading ? <Loader/> : (
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
                onFocus={() => this.setState({show: true})}
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
            {
              this.state.show ? (
                <PasswordValidationBox
                  password={this.state.user.newPassword}
                  rePassword={this.state.user.reNewPassword}
                />
              ) : null
            }
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
